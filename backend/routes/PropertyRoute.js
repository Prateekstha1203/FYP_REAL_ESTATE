const express = require("express");
const {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getAdminProperties,
  // getNearbyAmenities,
  getTopListings,
  getPropertyLocation,
  sendAgentEmail,
  getRentalProperties,
  getSaleProperties,
  getAgentProperties
} = require("../controller/PropertyController");
const { isAuthenticatedUser, authorizeRoles  } = require("../middleware/auth");
const router = express.Router();

router.route("/properties").get(getAllProperties);

router.route("/properties/rent").get(getRentalProperties);
router.route("/properties/sale").get(getSaleProperties);

router.route("/newListing").get(getTopListings);
router
  .route("/admin/properties")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProperties);


  router.route("/agent/viewlisting/:id").get(isAuthenticatedUser,authorizeRoles("agent"), getAgentProperties);


router
  .route("/agent/property/new")
  .post(isAuthenticatedUser, authorizeRoles("agent"), createProperty);

router
  .route("/agent/property/:id")
  .put(isAuthenticatedUser, authorizeRoles("agent"), updateProperty)
  .delete(isAuthenticatedUser, authorizeRoles("agent","admin"), deleteProperty);
  
router.route("/property/:id").get(getPropertyLocation).post(sendAgentEmail);

module.exports = router;
