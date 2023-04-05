// import React from 'react'
// import PropertyCard from '../../Common/CardComponent/PropertyCard'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import Loading from '../../../more/Loader';
// import { getWishlist } from '../../../actions/WistlistAction';

// const Wishlist = () => {
//   const dispatch = useDispatch();

//   const { wishlist } = useSelector((state) => state.wishlist);

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     dispatch(getWishlist())
//   }, [dispatch]);
//   return (
//     <>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <div>
//           {wishlist && (
//             <ul>
//               {wishlist.wishlist.map((wishlist) => (
//                 <li key={wishlist._id}>
//                   <p> {wishlist.user}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Wishlist

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../more/Loader';
import { getWishlist } from '../../../actions/WistlistAction';

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    // <div>
      
    //   {wishlist ? (
    //     <ul>
    //       {wishlist.wishlist.map((wishlist) => (
    //         <li key={wishlist._id}>
    //           <p> {wishlist.propertyTitle}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>Your wishlist is empty.</p>
    //   )}
    // </div>
    <div>
    {wishlist.map((item) => (
      <div key={item._id}>
        <p>{item.user}</p>
        <ul>
          {item.properties.map((property) => (
            <li key={property}>{property}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  );
  
};

export default Wishlist;
