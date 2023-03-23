import { useAuthentication } from "../context/authentication";
import React from "react";

const Home =()=> {
  // context
  const [authentication, setAuthentication] = useAuthentication();

  return (
    <div>
      <pre>{JSON.stringify(authentication, null, 4)}</pre>
    </div>
  )
}
export default Home;