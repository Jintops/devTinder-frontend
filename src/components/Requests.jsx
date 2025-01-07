import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector(store => store.requests)
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error(err)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
      console.log(res.data.data)
      dispatch(addRequests(res.data.data))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchRequests();
  }, [])

  if (!requests) return;

  if (requests.length === 0) return <h1 className='text-center text-3xl my-10 font-bold'>No Requests found</h1>;

  return (
    <div className=''>
      <h1 className='text-center text-3xl my-10 font-bold'>Connection Requests</h1>
      {
        requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

          return (
            <div key={_id} className="flex justify-around items-center border border-black bg-base-300 w-2/3  m-6 p-4 mx-auto">
              <figure>
                <img className='rounded-full w-24 h-24'
                  src={photoUrl}
                  alt="photo" />
              </figure>
              <div className="mx-6">
                <h2 className="">{firstName + "  " + lastName}</h2>
                {age && <p>{age + " "}</p>}
                {gender && <p>{gender}</p>}
                <p>{about}</p>

              </div>
              <div className='flex'>
                <button className="btn btn-active btn-secondary mx-2 " onClick={() => reviewRequests("accepted", request._id)}>Accept</button>
                <button className="btn btn-active btn-primary mx-2" onClick={() => reviewRequests("rejected", request._id)}>Reject</button>

              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Requests
