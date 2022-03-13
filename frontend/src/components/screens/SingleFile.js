import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';

const SingleFile = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [file, setFile] = useState({});

    useEffect(() => {
        const getFile = async () => {
          try {
            const res = await axios.get("http://localhost:5000/api/file/find/" + id);
            setFile(res.data);
            console.log("single data",id)
          } catch {}
        };
        getFile();
    }, [id]);

  
    
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 bg-white p-3">
          <img src={file.image} alt="" />
          <p className="text-xl font-bold py-2">{file.title}</p>
        <p className="text-gray-400 ">{file.desc}</p>
        <button  className="bg-green-500 w-full text-white my-2">edit file</button>
      </div>
      </div>
  )
}

export default SingleFile