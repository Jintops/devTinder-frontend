import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const user =useSelector(store=>store.user)
         const navigate=useNavigate();
    const handleLogin=()=>{
        navigate('/login')
}
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp"
          alt="Background"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white p-4">
          Welcome to DevTinder
        </h1>
        <p className="text-xl text-white mt-4">
          Discover amazing features and services
        </p>

        {/* Buttons */}

        {!user && <div className="mt-6 flex space-x-4">
          <button className="px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-md hover:bg-pink-700 transition" onClick={handleLogin}>
            Sign Up
          </button>
          <button className="px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-md hover:bg-pink-700 transition " onClick={handleLogin}>
            Login
          </button>
        </div>}
      </div>
    </div>
  );
};

export default HomePage;
