import React, { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../../../actions/WistlistAction";
const WishlistButton = ({ propertyId, userId }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const wishlist = await addToWishlist( propertyId);

      if (wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsAdded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const wishlist = await removeFromWishlist( propertyId);

      if (wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsAdded(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const wishlist = JSON.parse(localStorage.getItem('wishlist'));
  const isPropertyAdded = wishlist && wishlist.properties.includes(propertyId);

  return (
    <button onClick={isPropertyAdded ? handleRemoveFromWishlist : handleAddToWishlist}>
      {isAdded ? "Added to Wishlist" : isPropertyAdded ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
