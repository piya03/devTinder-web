import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ userData }) => {
  console.log("🚀 ~ EditProfile ~ userData: =======", userData);
  const {
    firstName: nameFirst,
    lastName: nameLast,
    age: AGE,
    gender: GENDER,
    image,
    id,
  } = userData;
  const [firstName, setFirstName] = useState(nameFirst);
  const [lastName, setlastName] = useState(nameLast || "");
  const [age, setAge] = useState(AGE || "");
  const [gender, setGender] = useState(GENDER || "");
  const [photoUrl, setPhotoUrl] = useState(image || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function saveProfile(id) {
    try {
      const res = await fetch(`api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          gender,
          image,
        }),
        credentials: "include",
      });

      const data = await res.json();
      dispatch(addUser(data));
      setShowToast(true);
      const i = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      console.log("🚀 ~ saveProfileeeeeeeeeeee", data);
    } catch (err) {
      setError("Some error occor");
      console.log(err, "i m unable to save profile");
    }
  }
  return (
    <div className="mb-48">
      {/* // Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-10">
          <div className="alert alert-success">
            <span>Profile sent successfully.</span>
          </div>
        </div>
      )}

      <div className="flex justify-center items-start my-10 gap-6 mx-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
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
                  <legend className="fieldset-legend">Last Name </legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL </legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age </legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="my-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender </legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center mt-2">
                <button
                  onClick={() => saveProfile(id)}
                  className="btn btn-primary"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, age, gender, image }} />
      </div>
    </div>
  );
};

export default EditProfile;
