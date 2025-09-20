import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import { FaMapMarkerAlt } from "react-icons/fa"; 

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/api/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/requests/received`, { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center">
        <h1 className="sm:text-3xl text-2xl mt-10 font-bold text-white">No Requests Found!!</h1>
        <p className="sm:text-3xl text-2xl mt-5 font-bold text-white">You have no pending connection requests at the moment</p>
        <img
                        loading="lazy"
                        src="/asset/empty-requests.svg"
                        alt="user-not-found"
                        className="block mx-auto w-96 mt-20"
                    />
      </div>
    );
  }

return (
  <div className="text-gray-100 py-8">
    <h1 className="text-center text-3xl font-bold mb-6">Connection Requests</h1>

    <div className="max-w-4xl mx-auto grid gap-6">
      {requests.map((request) => {
        const { firstName, location, photoUrl, age, gender, about } = request?.fromUserId;

        return (
          <div
            key={request?._id}
            className="bg-gray-800/60 rounded-lg shadow-md p-5 flex items-center justify-between mx-4"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 ">
              <img
                className="rounded-full w-20 h-20 border-4 border-indigo-700 object-cover"
                src={photoUrl}
                alt={`${firstName}`}
              />
              <div>
                <h2 className="text-lg font-medium ml-[2px]">
                  {firstName} 
                </h2>
                 <p className="flex items-center gap-1 text-sm text-gray-400 drop-shadow-md mt-1">
                                      <FaMapMarkerAlt className="text-gray-400" />{location}
                                    </p>
                {/* <div className="text-sm text-gray-400">
                  {age && <span className="mr-2">Age: {age}</span>}
                  {gender && <span>{gender}</span>}
                </div> */}
                {about && <p className="text-sm text-gray-300 mt-1">{about}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-sm text-gray-100 rounded hover:bg-green-700 transition"
                onClick={() => reviewRequests("accepted", request?._id)}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-sm text-gray-100 rounded hover:bg-red-700 transition"
                onClick={() => reviewRequests("rejected", request?._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default Requests;
