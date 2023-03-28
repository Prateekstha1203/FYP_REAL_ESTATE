import React from 'react'
import "./card.css";

const card = () => {
  return (
    <>
    <card>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-10 d-flex justify-content-evenly">
                            <div className="row">
                                <div className="col-4">
                                    <div className="cardContainer">
                                     <div class="card">
                                        <div class="card-body p-0">
                                            <div className="imgCard ps-3 pt-3">
                                                <button className='rentBtn'>For Rent</button>
                                                <div className="myCol col-4 mt-5">
                                                <span className="build px-2 text-center">Building</span>
                                                </div>
                                            </div>
            
                                            <h6 class="card-subtitle mb-2 text-body-secondary mt-2 ms-2">$12,345</h6>
                                            <h6 className='ms-2'>Golden Urban House For Sell</h6>
                                            <p class="location ms-2 "><i class="fa-solid fa-location-dot me-2"></i>Location, City, Country</p>
                                            <div className="row">
                                                <div className="col-4 d-flex justify-content-center">
                                                    <p className='location ms-2'><i class="fa-solid fa-l"></i> 1000 Sq.ft</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center">
                                                    <p className='location ms-2'><i class="fa-sharp fa-solid fa-bed"></i> 3 Bed</p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center">
                                                    <p className="location ms-2"><i class="fa-solid fa-bath"></i> 2 Bath</p>
                                                </div>
                                            </div>
                                        </div>
                                     </div>
                                    </div>
                                </div>
                                <div className="col-4"></div>
                                <div className="col-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </card>
    </>
  )
}

export default card

