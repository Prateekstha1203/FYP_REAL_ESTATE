import React, { useEffect } from "react";
import Sidebar from "../SideBarAdmin/Sidebar";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
    // eslint-disable-next-line
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../more/Metadata.js";
import Loading from "../../../more/Loader.js";
import { getAdminProperty } from "../../../actions/PropertyActions.js";
import { getAllUsers } from "../../../actions/userAction.js";

const Dashboard = () => {

  const dispatch = useDispatch();

  const { properties,loading } = useSelector((state) => state.properties);


  const { users } = useSelector((state) => state.allUsers);

     
  properties &&
  properties.forEach((listing) => {
      // if (listing === 0) {
      //   // outOfStock += 1;
      // }
    });

    useEffect(() => {
        dispatch(getAdminProperty());
        dispatch(getAllUsers());
      }, [dispatch]);    

  //   const lineState = {
  //       labels: ["Initial Amount", "Amount Earned"],
  //       datasets: [
  //         {
  //           label: "TOTAL AMOUNT",
  //           backgroundColor: ["#3BB77E"],
  //           hoverBackgroundColor: ["#3BB77E"],
  //           data: [0, totalAmount],
  //         },
  //       ],
  //     };

  //    const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };

    return (
       <>
       {loading ?
       <Loading />
       :(
        <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
{/*   
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ${totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div> */}
        </div>
      </div>
       )
       }
       </>
    );
  };
export default Dashboard
