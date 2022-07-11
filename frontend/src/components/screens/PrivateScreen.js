import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import FileScreen from "./FileScreen";
import { Link } from "react-router-dom";



const PrivateScreen = ({ history }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [file, setFile] = useState([]);
 

  
  const options = {
    method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/search/basic',
  params: {
    country: 'us',
    service: 'netflix',
    type: 'movie',
    genre: '18',
    page: "2",
    output_language: 'en',
    language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': 'd810575c63msh48ddf9184bd1246p1f7a2fjsn017d00747986',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
  };
  

useEffect(() => {
  const fetchData = () => {
    axios.request(options).then(function (response) {
     
      setFile(response.data.results);
      console.log(response.data.results, "data");
    }).catch(function (error) {
      console.error(error);
    });
  }

  fetchData();
}, [])
  
const searchItems = (searchValue) => {
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = file.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(file)
  }
}

  
  



  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return (
   
      <div>
     
      <div className="flex items-center justify-evenly bg-green-500">
        <div>Sparsh Movies</div>
        <button className="bg-white px-4 rounded " onClick={logoutHandler}>
          LogOut
        </button>
        </div>
        <div className="flex flex-col items-center">
        <input icon='search'
        placeholder='Search...'
        onChange={(e) => searchItems(e.target.value)}
    />
        </div>
        <p className="text-center bg-red-500 my-4 text-white font-bold"> All Movies</p>
      <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-4 px-4">
      {searchInput.length > 1 ? (
        filteredResults.map((item) => {
            return (
               
    <Link key={item.imdbID} to={`/file/${item.imdbID}`}>
      <FileScreen
        image={item.posterURLs[92]}
        title={item.originalTitle}
        desc={item.overview}
      />
    </Link>
            )
        })
    ) : (
        file.map((item) => {
            return (
              <Link key={item.imdbID} to={`/file/${item.imdbID}`}>
              <FileScreen
                image={item.posterURLs[92]}
                title={item.originalTitle}
                desc={item.overview}
              />
            </Link>
            )
        })
    )}
       
      </div>
    </div>
  );
};

export default PrivateScreen;

