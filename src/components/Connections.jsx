import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa"; 
const Connections = () => {
  const connections = useSelector((store) => store.connections);
 
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/connections`, { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center">
        <h1 className="sm:text-3xl text-2xl mt-10 font-bold text-white">No Connections Found</h1>
        <p className="sm:text-3xl text-2xl mt-5 font-bold text-white">Start connecting with other developers!</p>
       <img
                        loading="lazy"
                        src="/asset/empty-connections.svg"
                        alt="user-not-found"
                        className="block mx-auto w-96 mt-20"
                    />
      </div>
    );
  }

  return (
    <div className=" text-gray-100 py-10">
      <h1 className="text-center text-4xl font-extrabold mb-8">
        Your Connections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {connections.map((connection) => {
          const { _id, firstName, location, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="bg-gray-800/50 hover:bg-gray-800/30 rounded-lg shadow-lg p-6 flex items-center justify-between transition-colors"
            >
              <div className='flex gap-4'>
              <img
                className="rounded-full w-24 h-24 border-4 border-indigo-700  object-cover"
                src={photoUrl}
                alt={`${firstName} `}
              />
              <div>
                <h2 className="text-lg font-semibold ml-[2px]">
                  {firstName} 
                </h2>
               <p className="flex items-center gap-1 text-sm text-gray-400 drop-shadow-md mt-1">
                      <FaMapMarkerAlt className="text-gray-400" />{location}
                    </p>
                {age && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-200">Age:</span> {age}
                  </p>
                )}
                {/* {gender && (
                  <p className="text-sm text-white">
                    <span className="font-medium text-gray-300">Gender:</span> {gender}
                  </p>
                )} */}
                {about && (
                  <p className="text-sm text-white mt-2">
                    <span className="font-medium text-gray-300"></span> {about}
                  </p>
                )}
              </div>
              </div>
              <div> 
               <Link to={"/chat/"+_id}   state={{ photoUrl, firstName, location }}> <button className='btn bg-indigo-600 hover:bg-indigo-700 text-white'>Chat</button></Link>
                 </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
