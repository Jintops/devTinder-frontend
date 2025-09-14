import React, { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
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
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
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
    <div className="flex flex-col justify-center items-center min-h-screen px-4  text-white">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl  shadow-lg rounded-lg p-6 gap-6 my-10">

        {/* Profile Edit Form */}
        <div className="w-full lg:w-1/2 bg-gray-900 border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">Edit Profile</h2>

          {/* First Name */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">First Name</label>
            <input type="text" value={firstName} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setFirstName(e.target.value)} />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">Last Name</label>
            <input type="text" value={lastName} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setLastname(e.target.value)} />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">Photo URL</label>
            <input type="text" value={photoUrl} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">Skills</label>
            <div className="flex">
              <input
                type="text"
                value={skillInput}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter skill & press add"
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button className="ml-2 bg bg-gray-800 hover:bg-gray-700 border border-gray-400  text-white px-4 py-2 rounded-xl  transition" onClick={handleAddSkill}>Add</button>
            </div>

            {/* Skills Display */}
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <span key={index} className="bg-[#154360] text-white px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button className="ml-2 text-white hover:text-red-300" onClick={() => handleRemoveSkill(skill)}>✕</button>
                </span>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* About */}
          <div className="mb-4">
            <label className="text-gray-300 font-medium">About</label>
            <textarea value={about} className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setAbout(e.target.value)}></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-center">{error}</p>}

          {/* Save Button */}
          <div className="text-center mt-4">
            <button className="w-full bg bg-secondary text-white py-2 rounded-md hover:bg-green-400  transition" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <UserCard data={{ firstName, lastName, skills, photoUrl, gender, about }} />
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
