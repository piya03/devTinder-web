import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const [username, setUsername] = useState("sophiab");
  const [password, setPassword] = useState("sophiabpass");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   "username": "emmaj",
  //"password": "emmajpass",
  //"username": "sophiab",
  //"password": "sophiabpass",

  async function handleLogin() {
    try {
      const res = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30, // optional, defaults to 60
        }),
        credentials: "include",
      });
      const data = await res.json();

      dispatch(addUser(data));
      navigate("/");
    } catch (err) {
      console.log(err, "err");
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="my-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="my-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password </legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-2">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
