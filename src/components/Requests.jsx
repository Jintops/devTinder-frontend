import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-100">
        <h1 className="text-3xl font-bold">No Requests Found</h1>
        <p className="text-gray-400 mt-4">You have no pending connection requests at the moment.</p>
      
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <h1 className="text-center text-3xl font-bold mb-6">Connection Requests</h1>
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center justify-between p-4 border-b border-gray-700 last:border-none"
            >
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-12 h-12 object-cover border-2 border-indigo-500"
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                />
                <div>
                  <h2 className="text-lg font-medium">
                    {firstName} {lastName}
                  </h2>
                  <div className="text-sm text-gray-400">
                    {age && <span className="mr-2">Age: {age}</span>}
                    {gender && <span>{gender}</span>}
                  </div>
                  {about && <p className="text-sm text-gray-300 mt-1">{about}</p>}
                </div>
              </div>
              <div className="flex gap-3  ">
                <button
                  className="px-5 py-2 bg-green-600 text-sm text-gray-100 rounded hover:bg-green-700 transition"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="px-5 py-2 bg-red-600 text-sm text-gray-100 rounded hover:bg-red-700 transition"
                  onClick={() => reviewRequests("rejected", request._id)}
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
