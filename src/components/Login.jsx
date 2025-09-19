import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [emailId, setEmailId] = useState("vini@gmail.com");
  const [password, setPassword] = useState("Vini@777");
  const [firstName, setFirstName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const showRegister = useSelector((store) => store.register.showRegister);

  // if (showRegister) {
  //   return <Navigate to="/signup" />;
  // }

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, {
        emailId,
        password
      }, {
        withCredentials: true,
      })
      console.log(res.data)
      dispatch(addUser(res.data))
      return navigate("/feed")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err)
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/signup`, { firstName, emailId, password,location }, { withCredentials: true })
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className='flex justify-center my-28'>
      <div className="card  w-96 shadow-xl border border-indigo-700/50">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold text-white">{isLogin ? "Login" : "Create Account"} </h2>

          {!isLogin && <><label className="form-control w-full max-w-xs mt-6">
            <div className="label" >
              <span className="label-text text-white">Full Name</span>
            </div>
            <input type="text" value={firstName} className="input input-bordered w-full max-w-xs text-white" placeholder='Enter your full name' onChange={(e) => setFirstName(e.target.value)} />
          </label>
         
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white">Location</span>
              </div>
              <input type="text" value={location} className="input input-bordered w-full max-w-xs text-white " placeholder='Enter your location' onChange={(e) => setLocation(e.target.value)} />
            </label> </>}


          <label className="form-control w-full max-w-xs mt-4 my-4">
            <div className="label">
              <span className="label-text text-white">Email ID</span>
            </div>
            <input type="text" value={emailId} className="input input-bordered w-full max-w-xs text-white" placeholder='Enter your email'  onChange={(e) => setEmailId(e.target.value)} />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <input type="text" value={password} className="input input-bordered w-full max-w-xs text-white" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
          </label>
          <p className='text-red-500'>{error}</p>

          <div className="card-actions justify-center my-2">
            <button className="btn bg-indigo-600 w-full max-w-xs text-white hover:bg-indigo-700" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "Login" : "SignUp "}</button>
          </div>

          <div className="">
            <p className="cursor-pointer text-start text-sm  text-white" onClick={() => setIsLogin((value) => !value)}>
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span className="text-indigo-600 hover:text-indigo-700 font-semibold">
                    Register here
                  </span>
                </>
              ) : (
                <>
                  You have an account?{" "}
                  <span className="text-indigo-600 hover:text-indigo-700 font-semibold">
                     Login here
                  </span>
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
