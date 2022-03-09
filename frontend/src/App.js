import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route, Navigate 
} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Ragister from './pages/Ragister';
import { useSelector } from "react-redux";



const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" replace/> : <Login/>}/>
        <Route path="/ragister" element={user ? <Navigate to="/" replace /> : <Ragister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App