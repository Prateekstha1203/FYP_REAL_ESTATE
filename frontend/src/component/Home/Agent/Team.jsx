// import React from "react";
// import "./Team.css";
// import Image from "./agent.png";

// const Team = () => {
//   return (
//     <>
//       <section className="team background">
//         <div className="container">
//           <div className="content">
//             <div className=" row">
//               {agents.map((agent) => (
//                 <div className="box col-md-4" key={agent._id}>
//                   <button className="btn3">
//                     {agent.propertyTitle} Listings
//                   </button>
//                   <div className="details">
//                     <div className="img w-48 h-48 rounded-full overflow-hidden">
//                       <img
//                         src={Image}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                       <i className="fa-solid fa-circle-check"></i>
//                     </div>

//                     <div className="flex-auto ">
//                       <i className="fa fa-location-dot "></i>
//                       {agent.address}
//                     </div>
//                     <h4>{agent.name}</h4>
//                     <div className="button flex space-x-4 ">
//                       <button className="text-2xl ">
//                         <i className="fa fa-envelope"> </i>
//                         <span>Message</span>
//                       </button>
//                       <button className="btn4 ">
//                         <i className="fa fa-phone-alt"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Team;
