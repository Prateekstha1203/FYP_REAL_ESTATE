import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../actions/WistlistAction";
import PropertyCard from "../Common/CardComponent/PropertyCard";
const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (propertyId) => {
    dispatch(removeFromWishlist(propertyId));
  };

  return (
    // <div className="wishlist-container">
    //   <h2>My Wishlist</h2>
    //   <div className="wishlist-list">
    //     {wishlistItems.length === 0 ? (
    //       <div className="wishlist-empty">Your wishlist is empty.</div>
    //     ) : (
    //       wishlistItems.map((item) => (
    //         <div className="wishlist-item" key={item._id}>
    //           <div className="wishlist-img">
    //             <img
    //             //   src={item.images[0].url}
    //               alt={item.propertyTitle}
    //               src="https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    //             />
    //           </div>
    //           <div className="wishlist-details">
    //             <h3>{item.propertyTitle}</h3>
    //             <p>{item.address}</p>
    //             <p>$ {item.price}</p>
    //             <button
    //               className="wishlist-remove"
    //               onClick={() => handleRemoveFromWishlist(item._id)}
    //             >
    //               Remove from Wishlist
    //             </button>
    //           </div>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </div>
    <>
      {wishlistItems &&
        wishlistItems.map((wishlist) => (
          <div className="col-md-4" key={wishlist.id}>
            <PropertyCard wishlist={wishlist} className="card" />
          </div>
        ))}
    </>
  );
};

export default Wishlist;
