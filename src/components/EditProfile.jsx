import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {


  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("")
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName, lastName, photoUrl, skills, gender, about
      }
        , { withCredentials: true })
      dispatch(addUser(res.data.data))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000);
    } catch (err) {
      setError(err?.response?.data)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className='flex justify-center mx-10'>
        <div className="card bg-base-300 w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input type="text" value={firstName} className="input input-bordered w-full max-w-xs" onChange={(e) => setFirstName(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e) => setLastname(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">photoUrl</span>
              </div>
              <input type="text" value={photoUrl} className="input input-bordered w-full max-w-xs" onChange={(e) => setPhotoUrl(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Skills</span>
              </div>
              <input type="text" value={skills} className="input input-bordered w-full max-w-xs" onChange={(e) => setSkills(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>



            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea value={about} className="textarea textarea-bordered" onChange={(e) => setAbout(e.target.value)}></textarea>
              {/* <input type="text" value={about} className="input input-bordered w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)}/> */}
            </label>

            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard data={{ firstName, lastName, skills, photoUrl, gender, about }} />
      </div>

      {showToast && <div className="toast toast-top toast-center">

        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
    </div>
  )
}

export default EditProfile
