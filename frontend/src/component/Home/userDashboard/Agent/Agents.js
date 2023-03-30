import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAgents } from "../../../../actions/userAction";
import React from "react";
import Loading from "../../../../more/Loader";

const Agents = () => {
  const dispatch = useDispatch();

  const { agents } = useSelector((state) => state.agent);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAgents())
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, [dispatch]);

 

  if (!agents || !agents.length) {
    console.log("No agents found");
    return <div>No agents found.</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {agents.map((agent) => (
            <div key={agent._id}>
              <h3>{agent.name}</h3>
              <p>Email: {agent.email}</p>
              <p>Phone: {agent.phone}</p>
              {/* add other fields as needed */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Agents;
