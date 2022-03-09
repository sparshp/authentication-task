import React,{ useState }  from 'react'
import { login } from "../redux/apiCalls";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
  
    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { username, password });
    };

  return (
      <div className="w-full h-screen flex items-center justify-center">
      <form className="grid grid-cols-3 place-items-center w-full space-y-6 py-8 bg-gray-100">
      <div className="col-start-2 flex flex-col items-center space-x-2">
     
          <p className="text-xl font-bold tracking-wider">Login</p>
      </div>
      <div className="col-start-2 space-y-2">
          <p>Username</p>
          <input type="username" onChange={(e) => setUsername(e.target.value)} className="form-control border w-96 p-2 rounded-full outline-none" placeholder="Username.."/>
      </div>
      <div className=" col-start-2 space-y-2">
          <p>Password</p>
          <input type="password"  onChange={(e) => setPassword(e.target.value)} className="form-control border w-96 p-2 rounded-full outline-none" placeholder="Password..."/>
      </div>
      <button type="submit" onClick={handleClick} disabled={isFetching} className="border col-start-2 w-96 bg-black text-white font-bold rounded-full p-2" >Login</button>
              <div className="col-start-2 flex items-center justify-between w-96 text-blue-500">
                  
              {error && <h1>Something went wrong...</h1>}

         <Link to="/ragister"><p> don't have an account?</p></Link> 
      </div>
      <div className="col-start-2 flex items-center justify-between text-blue-500">
          <a href=""><p>Secourity & policy</p></a>
      </div>
  </form>
      </div>
  )
}

export default Login