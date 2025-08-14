import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("sophiab");
  const [password, setPassword] = useState("sophiabpass");
  const [error, setError] = useState("");

  const [isLogginForm, setLogginForm] = useState(true);
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
      if (res.status === 200) {
        navigate("/");
      } else {
        throw new Error(res.statusText);
      }
      const data = await res.json();

      dispatch(addUser(data));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSignUp() {
    navigate("/profile");
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogginForm ? "Login" : "SignUp"}
          </h2>
          {!isLogginForm && (
            <>
              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}

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
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button
              onClick={isLogginForm ? handleLogin : handleSignUp}
              className="btn btn-primary"
            >
              {isLogginForm ? "Login" : "signUp"}
            </button>
          </div>

          <button
            className="cursor-pointer m-auto py-2"
            onClick={() => setLogginForm((prev) => !prev)}
          >
            {isLogginForm ? "New user? signup here" : "Existing user"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
