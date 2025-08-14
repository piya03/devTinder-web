import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connection);
  console.log("🚀 ~ Connections ~ connectionData:", connectionData);

  /**
   *  this is dummy api to show user's connection ,
   * so i m using search api
   */
  async function fetchConnection(searchText = "john") {
    try {
      const res = await fetch(
        `https://dummyjson.com/users/search?q=${searchText}`
      );
      const data = await res.json();

      dispatch(addConnection(data.users));
    } catch (err) {
      console.log("some issue in connection");
    }
  }

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connectionData) return;

  if (connectionData.length === 0) {
    return <p>No connections found</p>;
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-4">Connections</h1>
      <div className="flex flex-wrap">
        {connectionData.map((elem) => {
          const { id, firstName, lastName, age, gender, image } = elem;
          return (
            <div
              key={id}
              className="bg-base-200 flex m-4 p-4 items-start gap-5 max-w-xl rounded-2xl"
            >
              <div>
                <img className="rounded-full" alt="photo" src={image} />
              </div>
              <div>
                <h2 className="text-xl">{firstName + " " + lastName}</h2>
                <h2>{age + " " + gender}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
