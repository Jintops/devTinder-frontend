import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
   const handleLogin=()=>{
    navigate('/login')
   }
  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      dispatch(removeUser());
      return navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <h1 className='btn btn-ghost text-xl bg-slate-800'>🧑‍💻DevTinder</h1>
      </div>
      <div>
     {!user && <button className=" btn  bg-slate-800 hover:bg-gray-700 text-white" onClick={handleLogin}>Login</button>}
      </div>
      {user && <div className=''>
        <p className='font-bold'> Welcome, {user.firstName}</p>
      </div>}
      {user && <div className="flex-none gap-2">

        <div className="dropdown dropdown-end mx-4 ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-pink-800 hover:bg-pink-900">
            <div className="w-10 rounded-full ">
              <img
                alt="photo of user"
                src={user.photoUrl} />
            </div>
          </div>
          <ul 
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between ">
                Profile
              
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/requests">Requests</Link></li>
             <li><Link to="/premium">Premium</Link></li>
            <li><a onClick={handleLogOut}>Log out</a></li>
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default NavBar
