import React from "react";
import AgentSidebar from "../SideBar/AgentSideBar";
import "./dashboard.css";

const admin = () => {
  return (
    <>
      <div>
        <admin>
          <div className="container-fluid d-flex p-0">
            <div className="col-2">
              <AgentSidebar />
            </div>
            <div className="content col-9 ps-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="row justify-content-evenly">
                      <div className="col-4">
                        <div class="card mt-5">
                          <div class="card-body">
                            <h5 class="card-title mb-3">Number of Listing</h5>
                            <p class="card-text">Attendance Percentage: 80%</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div class="card mt-5">
                          <div class="card-body">
                            <h5 class="card-title mb-3">Property for Rent</h5>
                            <p class="card-text">Through Bonus: 65%</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div class="card mt-5">
                          <div class="card-body">
                            <h5 class="card-title mb-3">Property for Rent</h5>
                            <p class="card-text">Through Bonus: 65%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row  mt-5">
                      <div className="col-md-5">
                        <div class="card-body">
                          <h5 class="card-title mt-4 mb-3">Visitor Insights</h5>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div class="card-body">
                          <h5 class="card-title mt-4 mb-3">Visitor Insights</h5>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row justify-content-evenly">
                      <div className="col-11">
                        <div class="card mt-5">
                          <div class="card-body">
                            <h5 class="card-title mt-4 mb-3">
                              Recent Activity
                            </h5>
                            <div className="col-11 mb-5">
                              <table>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Order Number</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>John</td>
                                    <td>12</td>
                                    <td>$100</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="col-3">
                  <div className="row justify-content-evenly ">
                    <div className="col-12">
                      <div class="myCard card mt-5">
                        <div class="card-body">
                          <h5 class="card-title mb-3">Employee Record</h5>
                          <div className="row justify-content-center">
                            <div className="col-11 mb-5">
                              <table>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Salary</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>01</td>
                                    <td>Minato</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>02</td>
                                    <td>Naruto</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>03</td>
                                    <td>Madara</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>04</td>
                                    <td>Jiraiya</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>05</td>
                                    <td>Kurama</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>06</td>
                                    <td>Ronaldo</td>
                                    <td>Paid</td>
                                  </tr>
                                  <tr>
                                    <td>07</td>
                                    <td>Mbappe</td>
                                    <td>Paid</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div class="myCard card mt-5">
                        <div class="card-body">
                          <h5 class="card-title mb-3">Employee Progress</h5>
                          <div className="row justify-content-center">
                            <div className="col-11 mb-5">
                              <div className="row">
                                <div className="col-6">
                                  <span>Last Month</span>
                                  <p className="my-2">$4.087</p>
                                </div>
                                <div className="col-6">
                                  <span>Last Month</span>
                                  <p className="my-2">$4.087</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                  <div className="col-8 bg-dark"></div>
                </div>
              </div>
            </div>
          </div>
        </admin>
      </div>
    </>
  );
};

export default admin;
