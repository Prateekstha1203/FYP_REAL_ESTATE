import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAgentProperties } from "../../../actions/PropertyActions";
import AgentSidebar from "../SideBar/AgentSideBar";

const ViewListing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { properties, loading, error } = useSelector(
    (state) => state.agentProperties
  );

  useEffect(() => {
    dispatch(fetchAgentProperties(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AgentSidebar id={id} />
      <h2>Agent Properties</h2>
      <ul>
        {properties &&
          properties.map((property) => (
            <li key={property.id}>
              <h3>{property.title}</h3>
              <p>{property.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ViewListing;
