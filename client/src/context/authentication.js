// src/context/auth.js
// import React from "react";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import { API } from "../config";

// //config axios

// const AuthenticationContext = createContext();

// const AuthenticationProvider = ({ children }) => {
//   const [authentication, setAuthentication] = useState({
//     user: null,
//     token: "",
//     refreshToken: "",
//   });

//   useEffect(() => {
//     let fromLS = localStorage.getItem('authentication');
//     if(fromLS) setAuthentication(JSON.parse(fromLS))
//   }, []);

//   axios.defaults.baseURL = API;
//   return (
//     <AuthenticationContext.Provider value={[authentication, setAuthentication]}>
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };

// const useAuthentication = () => useContext(AuthenticationContext); // [ authentication,  setAuthentication]

// export { useAuthentication, AuthenticationProvider }; // wrap the app with provider


import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config";

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    let fromLS = localStorage.getItem("auth");
    if (fromLS) setAuthentication(JSON.parse(fromLS));
  }, []);

  // configure axios
  axios.defaults.baseURL = API;

  return (
    <AuthenticationContext.Provider value={[authentication, setAuthentication]}>
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuthentication = () => useContext(AuthenticationContext);

export { useAuthentication, AuthenticationProvider };