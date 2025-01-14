import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeOneUser } from '../utils/feedSlice'

const UserCard = ({ data }) => {

  const { _id, firstName, lastName, photoUrl, skills , gender, about } = data;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true })
      dispatch(removeOneUser(userId))
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-xl">
        <figure className="">
          <img
            className="border-4 border-gray-500 rounded-lg"
            src={photoUrl}
            alt="profile"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {skills.length!==0 && <p>skills:{skills}</p>}
          {gender && <p>Gender:{gender}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignored</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
