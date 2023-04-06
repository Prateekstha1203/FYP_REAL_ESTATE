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
} = require("../controller/PropertyController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/properties").get(getAllProperties);

router.route("/newListing").get(getTopListings);
router
  .route("/admin/properties")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProperties);

router
  .route("/admin/property/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProperty);

router
  .route("/admin/property/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProperty)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProperty);
router.route("/property/:id").get(getPropertyLocation).post(sendAgentEmail);

module.exports = router;
