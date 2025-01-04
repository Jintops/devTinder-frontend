import React, { useEffect } from 'react'
import NavBar from './NavBar'

import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Body = () => {
  const diapatch = useDispatch();
 const navigate=useNavigate();
 const userData = useSelector((store) =>store.user);

  const fetchdata = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL +"/profile/view", {
        withCredentials: true,
      })
      diapatch(addUser(res.data))
    } catch (err) {
      if(err.status===401){
        navigate("/login")
      }    
      console.error(err)
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <NavBar/>
     <Outlet></Outlet>
      <Footer/>
    </div>
  )
}

export default Body
