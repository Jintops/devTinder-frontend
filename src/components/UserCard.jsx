import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeOneUser } from "../utils/feedSlice";

const UserCard = ({ data }) => {
  const { _id, firstName, lastName, photoUrl, skills, gender, about } = data;
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
    <div className="p-4">
      <div className="card w-80 shadow-xl bg-gradient-to-r from-gray-800 via-blue-900 to-gray-900 text-white rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <figure className="p-4 flex justify-center">
          <img
            className="w-32 h-32 object-cover rounded-full border-4 shadow-md"
            src={photoUrl}
            alt="profile"
          />
        </figure>

<div className="card-body flex justify-center items-center">
  {firstName && (
    <h2 className="card-title text-xl font-bold">
      {lastName ? `${firstName} ${lastName}` : firstName}
    </h2>
  )}



          {gender && <p className="text-gray-300">{gender}</p>}
          <p className="text-sm text-gray-300 mt-2">{about}</p>

          {skills.length !== 0 && (
            <div className="mt-3 text-center">
              <h3 className="font-semibold text-gray-200">Skills:</h3>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-outline btn-error w-28 transition-all duration-300 hover:bg-red-600"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline btn-success w-28 transition-all duration-300 hover:bg-green-600"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
