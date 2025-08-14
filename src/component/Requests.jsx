import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requestData = useSelector((store) => store.requests);

  async function fetchRequest() {
    try {
      const res = await fetch(
        "https://dummyjson.com/users/filter?key=hair.color&value=Brown"
      );
      const data = await res.json();
      console.log("🚀 ~ fetchRequest ~ data:", data);

      dispatch(addRequests(data.users));
    } catch (err) {
      console.log(err);
    }
  }

  function reviewRequest(id) {
    dispatch(removeRequest(id));
  }
  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestData) return;

  if (requestData.length === 0) {
    return <p>No requests found</p>;
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-4">Connection Requests</h1>
      <div className="grid grid-cols-[auto_auto_auto] justify-center items-center">
        {requestData.map((elem) => {
          const { firstName, lastName, age, gender, image, id } = elem;
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
              <div className="flex mx-2 self-end">
                <button
                  onClick={() => reviewRequest(id)}
                  className="btn btn-primary mr-2"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest(id)}
                  className="btn btn-secondary"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
