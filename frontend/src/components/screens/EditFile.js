import axios from 'axios';
import React, { useState } from 'react'


const url = "http://localhost:5000/api/file"

const EditFile = () => {
    const [editInput, setEditInput] = useState([]);
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
        axios.put(url, {
          image: data.image,
          title: data.title,
          desc: data.desc,
        }).then(res => {
          console.log(res.data)
        })
    
      }
  return (
      <div>
      <form onSubmit={(e)=>submit(e)} className="flex flex-col items-center h-56 justify-between my-8 border-2 p-4">
            <p>Upload File</p>
            <input onChange={(e)=>handle(e)} id="image" value={data.image} type="url" placeholder="Upload Image URL" className="px-2" />
            <input onChange={(e)=>handle(e)} id="title" value={data.title}  type="text"  placeholder="Title" className="px-2" />
            <input onChange={(e) => handle(e)} id="desc" value={data.desc} type="text"  placeholder="Description" className="px-2" />
            <button className="bg-green-500 w-full text-white" type="submit">Upload</button>
          </form>
      </div>
  )
}

export default EditFile