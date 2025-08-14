import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, image, id } = user;
  const dispatch = useDispatch();

  function handleSendRequest(id) {
    dispatch(removeUserFromFeed(id));
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{`${age} ${gender}`}</p>}
        <div className="card-actions justify-center">
          <button
            onClick={() => handleSendRequest(id)}
            className="btn btn-primary"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest(id)}
            className="btn btn-secondary"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
