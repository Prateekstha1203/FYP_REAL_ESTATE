import React, { useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Draggable from "react-draggable";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { logout } from "../actions/userAction";
import { ToastContainer, toast } from "react-toastify";

const UserData = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  window.addEventListener("scroll", () => {
    const speedDialEl = document.querySelector(".speedDial");
    if (speedDialEl) {
      if (window.pageYOffset > 100) {
        speedDialEl.classList.add("active");
      } else {
        speedDialEl.classList.remove("active");
      }
    }
  });

  const dispatch = useDispatch();

  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  if (user.role === "agent") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: agentDashboard,
    });
  }

  function agentDashboard() {
    history.push("/agentDashboard");
  }
  function dashboard() {
    history.push("/dashboard");
  }
  function home() {
    history.push("/");
  }
  function account() {
    history.push("/me");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "12" }} />
      <Draggable bounds="parent">
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={user.avatar.url ? user.avatar.url : "/profile.png"}
              alt="Profile"
              style={{
                position: "fixed",
              }}
            />
          }
          open={open}
        >
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={false}
            />
          ))}
        </SpeedDial>
      </Draggable>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  );
};

export default UserData;
