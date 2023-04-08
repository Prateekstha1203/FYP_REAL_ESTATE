import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, isAgent, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  return (
    <>
      {typeof token != "undefined" ? (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            if (isAgent === true && (user.role !== "admin" && user.role !== "agent")) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      ) : (
        <Redirect to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoute;


// const AgentProtectedRoute = ({ isAgent, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   const token = localStorage.getItem("token");
//   return (
//     <>
//       {typeof token != "undefined" ? (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Redirect to="/login" />;
//             }
//             if (isAgent === true && user.role !== "agent") {
//               return <Redirect to="/login" />;
//             }
//             return <Component {...props} />;
//           }}
//         />
//       ) : (
//         <Redirect to={"/"} />
//       )}
//     </>
//   );
// };

// export default AgentProtectedRoute;