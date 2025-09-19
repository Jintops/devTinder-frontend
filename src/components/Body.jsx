import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Header from "./Header";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const userData = useSelector((store) => store.user);

  const fetchdata = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Hide Navbar and Footer on the login page
  // const hideNavFooter = location.pathname === "/login";

  return (
    <div >
      {<Header />}
      <Outlet />
     
    </div>
  );
};

export default Body;
