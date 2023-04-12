import React, { Fragment, useEffect, useState } from "react";
import AgentSidebar from "../SideBar/AgentSideBar";
import "./dashboard.css";
import { getAllUsers } from "../../../actions/userAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../more/Loader.js";
import { getAgentProperties } from "../../../actions/PropertyActions.js";
import { Doughnut, Bar } from "react-chartjs-2";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { Group } from "@mui/icons-material";
import { AttachMoney, Payment } from "@material-ui/icons";
import {
  Chart as ChartJS,
  ArcElement,
  tooltip,
  Legend,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const admin = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.properties);
  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    dispatch(getAgentProperties());
  }, [dispatch]);
  const category1 = properties.filter(
    (property) => property.category === "Banglow"
  ).length;
  const category2 = properties.filter(
    (property) => property.category === "Apartment"
  ).length;
  const category3 = properties.filter(
    (property) => property.category === "Villa"
  ).length;

  const rentProperties = properties.filter(
    (property) => property.propertyType === "Rent"
  ).length;
  const saleProperties = properties.filter(
    (property) => property.propertyType === "Sale"
  ).length;

  const data = {
    labels: ["Rent", "Sale"],
    datasets: [
      {
        label: "Properties",
        data: [rentProperties, saleProperties],
        backgroundColor: ["#FF6384", "#36A2EB"], // custom colors
        borderColor: ["#FF6384", "#36A2EB"], // matching border colors
        borderWidth: 1,
      },
    ],
  };
  // Create the bar chart data
  const barChartData = {
    labels: ["Bungalow", "Apartment", "Villa"],
    datasets: [
      {
        label: "Number of Properties",
        data: [category1, category2, category3],
        backgroundColor: ["#3BB77E", "#FFA700", "#E3475B"],
        hoverBackgroundColor: ["#3BB77E", "#FFA700", "#E3475B"],
      },
    ],
  };

  // Create the bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          beginAtZero: true,
          ticks: {
            stepSize: 0.5,
          },
        },
      ],
    },
  };
  const options = {};
  // return (
  //   <>
  //     <div>
  //       <admin>
  //         <div className="container-fluid d-flex p-0">
  //           <div className="col-2">
  //             <AgentSidebar />
  //           </div>
  //           <div className="content col-9 ps-5">
  //             <div className="container-fluid">
  //               <div className="row">
  //                 <div className="col-12">
  //                   <div className="row justify-content-evenly">
  //                     <div className="col-4">
  //                       <div class="card mt-5">
  //                         <div class="card-body">
  //                           <h5 class="card-title mb-3">Number of Listing</h5>
  //                           <p class="card-text">Attendance Percentage: 80%</p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div className="col-4">
  //                       <div class="card mt-5">
  //                         <div class="card-body">
  //                           <h5 class="card-title mb-3">Property for Rent</h5>
  //                           <p class="card-text">Through Bonus: 65%</p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                     <div className="col-4">
  //                       <div class="card mt-5">
  //                         <div class="card-body">
  //                           <h5 class="card-title mb-3">Property for Rent</h5>
  //                           <p class="card-text">Through Bonus: 65%</p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div className="row  mt-5">
  //                     <div className="col-md-5">
  //                       <div class="card-body">
  //                         <h5 class="card-title mt-4 mb-3">Visitor Insights</h5>
  //                       </div>
  //                     </div>
  //                     <div className="col-md-5">
  //                       <div class="card-body">
  //                         <h5 class="card-title mt-4 mb-3">Visitor Insights</h5>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </admin>
  //     </div>
  //   </>
  // );
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid d-flex p-0">
          {showSidebar && (
            <div className="col-2">
              <AgentSidebar />
            </div>
          )}
          <div class="wrapper container">
            <div className="container-fluid">
              {/* Page Heading */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a
                  href="#"
                  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  onClick={() => {
                    window.print();
                    setShowSidebar(false);
                  }}
                >
                  <i className="fas fa-download fa-sm text-white-50" /> Generate
                  Report
                </a>
              </div>
              {/* Content Row */}
              <div className="row">
                <div className="d-flex align-items-center justify-content-evenly">
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col-9 ">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                              Total Property
                            </div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                  {properties && properties.length}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <HomeIcon
                              fontSize="large"
                              style={{ color: "#17a2b8" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              Total Sale
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {saleProperties}
                            </div>
                          </div>

                          <div className="col-3">
                            <Group fontSize="large" color="success" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col-9">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              Total Rent
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {rentProperties}
                            </div>
                          </div>
                          <div className="col-3">
                            <AttachMoney
                              fontSize="large"
                              style={{ color: "#FFC107" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content Row */}
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-6 ">
                      <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Property Category
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="chart-area d-flex align-items-center justify-content-center">
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{
                                width: "300px",
                                height: "300px",
                                marginLeft: "1.7rem",
                              }}
                            >
                              <Bar
                                data={barChartData}
                                options={barChartOptions}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="card shadow mb-4">
                        {/* Card Header - Dropdown */}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Property Type (Rent / Sell)
                          </h6>
                        </div>
                        {/* Card Body */}
                        <div className="card-body d-flex align-items-center justify-content-center">
                          <div
                            className="cardItem"
                            style={{
                              width: "300px",
                              height: "300px",
                              marginLeft: "1.7rem",
                            }}
                          >
                            <Doughnut data={data} options={options} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default admin;
