import React from 'react'
import { FaCode } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router";
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Header = () => {

    const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  const handleLogOut = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true })
      dispatch(removeUser());
      return navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
   <header className="min-h-16 px-3 sm:px-5  bg-color-1 shadow-md shadow-indigo-500/50">
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link
                        to="/"
                        className="flex items-center gap-1 sm:gap-2 font-bold text-lg sm:text-xl">
                        <FaCode className="w-5 h-5 sm:h-6 sm:w-6 text-white" />
                        <span className='text-white'>DevTinder</span>
                    </Link>
                </div>
                {user ? (
                    <div className="flex items-center gap-4 text-sm">
                        <p className="sm:block hidden">
                            Welcome, <b>{user?.firstName}</b>
                        </p>

                        <div className="dropdown dropdown-end">
                            <div 
    tabIndex={0} 
    role="button" 
    className="btn btn-ghost flex items-center gap-2 px-2"
  >
    <div className="w-10 rounded-full overflow-hidden">
      <img alt="User avatar" src={user.photoUrl} />
    </div>
    {/* ▼ Arrow with transition */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-4 w-4 text-white  transition-transform duration-200 dropdown-arrow"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-base dropdown-content bg-base-100 rounded-box z-[1000] w-40 shadow p-0 py-2">
                                <p className="font-bold px-3">My Account</p>
                                <div className="divider m-0 mt-1"></div>
                                <div className="space-y-1">
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                     <li><Link to="/feed">Feed</Link></li>
                                    <li>
                                        <Link to="/requests">Requests</Link>
                                    </li>
                                    <li>
                                        <Link to="/connections">Connections</Link>
                                    </li>
                                    <li><Link to="/premium">Premium</Link></li>
                                    <li>
                                        <span onClick={handleLogOut}>Logout</span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                ) : (
                  <Link to="/login">  <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white">
                        Log In
                    </button></Link>
                )}
            </div>
        </header>
  )
}

export default Header