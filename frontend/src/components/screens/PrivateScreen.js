import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import FileScreen from "./FileScreen";
import { Link } from "react-router-dom";

const url="http://localhost:5000/api/file"

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    image:"",
    title: "",
    desc:""
    
  })

  

  const handle=(e)=>{
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  const submit = (e) => {
    e.preventDefault();
    axios.post(url, {
      image: data.image,
      title: data.title,
      desc: data.desc,
    }).then(res => {
      console.log(res.data)
    })

  }
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
        console.log(privateData);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/file");
        setFile(res.data);
        console.log(file);
      } catch (err) {
        console.error(err);
      }
    };
    getFiles();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
      <div className="flex items-center justify-evenly bg-green-500">
        <div>{privateData}</div>
        <button className="bg-white px-4 rounded " onClick={logoutHandler}>
          LogOut
        </button>
        </div>
        <div className="flex flex-col items-center">
          <form onSubmit={(e)=>submit(e)} className="flex flex-col items-center h-56 justify-between my-8 border-2 p-4">
            <p>Upload File</p>
            <input onChange={(e)=>handle(e)} id="image" value={data.image} type="url" placeholder="Upload Image URL" className="px-2" />
            <input onChange={(e)=>handle(e)} id="title" value={data.title}  type="text"  placeholder="Title" className="px-2" />
            <input onChange={(e) => handle(e)} id="desc" value={data.desc} type="text"  placeholder="Description" className="px-2" />
            <button className="bg-green-500 w-full text-white" type="submit">Upload</button>
          </form>
        </div>
        <p className="text-center bg-red-500 my-4 text-white font-bold"> All uploaded files</p>
      <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-4 px-4">
        {file.map((item) => {
          return (
            <div key={item._id} >
              <Link key={item._id} to={`/file/${item._id}`}>
                {" "}
                <FileScreen 
                  key={item._id}
                  image={item.image}
                  title={item.title}
                  desc={item.desc}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivateScreen;
