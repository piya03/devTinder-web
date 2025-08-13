import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);

  async function getFeed() {
    try {
      if (feedData) return; // if feed present return it do not call the api
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      dispatch(addFeed(data.users));
    } catch (err) {
      console.log(err, "error ");
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {feedData &&
        feedData.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
    </div>
  );
};

export default Feed;
