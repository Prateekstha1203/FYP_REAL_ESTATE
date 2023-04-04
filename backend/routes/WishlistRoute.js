const express = require("express");
const router = express.Router();
const {addToWishlist ,removeFromWishlist,getWishlist} = require("../controller/WishlistController")

const { isAuthenticatedUser } = require("../middleware/auth");

// Add property to wishlist
router.post("/addToWishlist/:id", isAuthenticatedUser, addToWishlist);

// Remove property from wishlist
router.delete("/removeFromWishlist/:id", isAuthenticatedUser, removeFromWishlist);

// Get user's wishlist
router.get("/wishlist", isAuthenticatedUser, getWishlist);

module.exports = router;
