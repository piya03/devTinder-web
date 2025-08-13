import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useDispatch } from "react-redux";

// components
import NavBar from "./NavBar";
import Footer from "./Footer";

// utils
import { baseUrl } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchUser() {
    try {
      /* providing accessToken in bearer */
      const res = await fetch(baseUrl + "/me", {
        method: "GET",
        headers: {
          //  Authorization: "Bearer /* YOUR_ACCESS_TOKEN_HERE */", // Pass JWT via Authorization header
        },
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      if (res.status === 401) {
        navigate("/login");
      }
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(addUser(data));
    } catch (err) {
      console.log("🚀 ~ fetchUser ~ err:", err);
      navigate("/errorPage");
    }
  }

  useEffect(() => {
    console.log("hello");
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
