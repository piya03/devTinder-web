import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  console.log("🚀 ~ Profile ~ userData: -----", userData);

  return <div>{userData && <EditProfile userData={userData} />}</div>;
};

export default Profile;
