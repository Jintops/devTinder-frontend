import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
 
import { FaMapMarkerAlt, FaUser, FaImage, FaCode, FaInfoCircle } from "react-icons/fa";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [location, setLocation] = useState(user.location);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills || []);
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(`${BASE_URL}/api/profile/edit`, {
        firstName,
        location,
        photoUrl,
        skills,
        gender,
        about
      }, { withCredentials: true });

      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="flex flex-col justify-center items-center  lg:px-4  text-white">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl  shadow-lg rounded-lg p-6 gap-6 my-10">

        {/* Profile Edit Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#2c2c34] via-[#1f1f29] to-[#141418]
                border border-indigo-700/30 p-8 rounded-2xl shadow-xl 
                backdrop-blur-md">
  <h2 className="text-3xl font-bold text-center text-white mb-8">
    Edit Profile
  </h2>

  {/* First Name */}
  <div className="mb-5">
    <label className=" text-gray-300  mb-2text-gray-300 font-medium mb-2 flex items-center gap-1  drop-shadow-md"> <FaUser className="text-gray-400" />Full Name</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 transition"
      placeholder="Enter your full name"
    />
  </div>

  {/* Last Name */}
  <div className="mb-5">
    <label className=" text-gray-300 font-medium mb-2 flex items-center gap-1  drop-shadow-md "><FaMapMarkerAlt className="text-gray-400" />Location</label>
    <input
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 transition"
      placeholder="Enter your location"
    />
  </div>

  {/* Photo URL */}
  <div className="mb-5">
    <label className="text-gray-300 font-medium mb-2 flex items-center gap-1  drop-shadow-md"><FaImage className="text-gray-400" />Profile Photo URL</label>
    <input
      type="text"
      value={photoUrl}
      onChange={(e) => setPhotoUrl(e.target.value)}
      className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 transition"
      placeholder="https://example.com/photo.jpg"
    />
  </div>

  {/* Skills */}
  <div className="mb-5">
    <label className="text-gray-300 font-medium mb-2 flex items-center gap-1  drop-shadow-md"><FaCode className="text-gray-400" />Skills</label>
    <div className="flex">
      <input
        type="text"
        value={skillInput}
        placeholder="Enter a skill"
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
        className="flex-1 p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                   text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   transition"
      />
      <button
        onClick={handleAddSkill}
        className="ml-2 px-4 lg:px-5 py-1 bg-indigo-600 hover:bg-indigo-500 
                   text-white rounded-lg transition font-medium"
      >
        Add
      </button>
    </div>

    {/* Skill Tags */}
    <div className="flex flex-wrap gap-2 mt-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className=" bg-indigo-500 border border-indigo-600/30 text-white px-4 py-1 rounded-full 
                     flex items-center gap-2 shadow-sm"
        >
          {skill}
          <button
            onClick={() => handleRemoveSkill(skill)}
            className="text-gray-200 hover:text-red-400 transition"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  </div>

  {/* Gender */}
  {/* <div className="mb-5">
    <label className="block text-gray-300 font-medium mb-2">Gender</label>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 transition"
    >
      <option value="" disabled>
        Select Gender
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div> */}

  {/* About */}
  <div className="mb-5">
    <label className="text-gray-300 font-medium mb-2 flex items-center gap-1  drop-shadow-md">  <FaInfoCircle className="text-gray-400" /> About</label>
    <textarea
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      className="w-full p-3 bg-gray-900/70 border border-gray-600 rounded-lg 
                 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 transition resize-none h-24"
      placeholder="Write something about yourself..."
    ></textarea>
  </div>

  {/* Error */}
  {error && (
    <p className="text-red-400 text-center font-medium mb-4">{error}</p>
  )}

  {/* Save Button */}
  <div className="text-center mt-6">
    <button
      onClick={saveProfile}
      className="w-full bg-indigo-600
                 hover:bg-indigo-700 text-white 
                 py-3 rounded-lg font-semibold transition transform 
                 hover:scale-105 shadow-lg"
    >
      Save Profile
    </button>
  </div>
</div>


        {/* Preview Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <UserCard data={{ firstName, location, skills, photoUrl, gender, about }} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-lg">
          Profile updated successfully.
        </div>
      )}
    </div>
  );
};

export default EditProfile;
