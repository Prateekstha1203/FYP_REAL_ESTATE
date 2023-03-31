const express = require("express");
const {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetails,
  getAdminProperties,
  // getNearbyAmenities,
  getPropertyLocation,
} = require("../controller/PropertyController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/properties").get(getAllProperties);

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
// router.route("/property/:address").get(getNearbyAmenities);

router.route("/property/:id").get(getPropertyDetails);

module.exports = router;

router.route("/:address").get(getPropertyLocation)