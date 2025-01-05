import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [emailId,setEmailId]=useState("vini@gmail.com");
  const [password,setPassword]=useState("Vini@777");
  const [error,setError]=useState("");
  const dispatch= useDispatch();
  const navigate=useNavigate();
  
  const handleLogin= async()=>{
  try{
     const res=await axios.post(BASE_URL+"/login",  {
      emailId,
      password
     },{
      withCredentials:true,
     })
    
     dispatch(addUser(res.data))
    return navigate("/")
  }catch(err){
    setError(err?.response?.data || "Something went wrong")
    console.log(err)
  }
  }
 
  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-xl ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login </h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input type="text"  value={emailId} className="input input-bordered w-full max-w-xs" onChange={(e)=>setEmailId(e.target.value)} />
          </label>
          
          <label className="form-control w-full max-w-xs"> 
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input type="text" value={password} className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)}/>
          </label>
         <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
