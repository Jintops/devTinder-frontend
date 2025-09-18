import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeOneUser } from "../utils/feedSlice";
import { FaMapMarkerAlt } from "react-icons/fa"; 
const UserCard = ({ data }) => {
  const { _id, firstName, photoUrl, skills,  about,  location } = data;
  
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeOneUser(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="lg:w-96 rounded-2xl overflow-hidden shadow-lg 
        bg-gradient-to-br from-[#2c2c34] via-[#1f1f29] to-[#141418] 
        text-white backdrop-blur-lg border border-gray-700/50 
        transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ">

        {/* Profile Section */}
        <div className="relative w-full h-72">
          <img
            className="w-full h-full object-cover"
            src={photoUrl || "/no-image.png"}
            alt="profile"
          />
          {/* Overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 
                  bg-gradient-to-t from-black/90 via-black/50 to-transparent">
    <h1 className="font-bold text-2xl text-white drop-shadow-md">
      {firstName} 
    </h1>
    
     <p className="flex items-center gap-1 text-sm text-gray-200 drop-shadow-md mt-1">
        <FaMapMarkerAlt className="text-white" />{location}
      </p>
    
  </div>
        </div>

        {/* Card Body */}
        <div className="card-body  px-6 py-4">
          {/* {gender && <p className="text-sm text-gray-400">{gender}</p>} */}

          {/* About */}
          <p className="text-md  font-semibold text-white mt-2 line-clamp-3">
            {about || "No description available."}
          </p>

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Skills 
              </h3>
              <div className="flex flex-wrap gap-2 ">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-3xl 
                      bg-gradient-to-r from-indigo-500/20  to-purple-600/20 font-semibold border border-pink-500/30
                      text-white shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-6 mt-8">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full 
                border border-red-500 text-red-400 hover:bg-red-600 hover:text-white 
                transition-all duration-300 shadow-md"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              ❌
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full 
                border border-green-500 text-green-400 hover:bg-green-600 hover:text-white 
                transition-all duration-300 shadow-md"
              onClick={() => handleSendRequest("interested", _id)}
            >
              💚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
