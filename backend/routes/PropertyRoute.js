const express = require("express");
const {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetails,
  getAdminProperties,
  // getNearbyAmenities,
  getTopListings,
  getPropertyLocation,
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
// router.route("/property/:address").get(getPropertyLocation);

router.route("/property/:id").get(getPropertyDetails);



// router.get('/property/:address/:id', async (req, res, next) => {
//   try {
//     const [locationResult, detailsResult] = await Promise.all([
//       getPropertyAmenities(req, res, next),
//       getPropertyDetails(req, res, next)
//     ]);

//     res.json({
//       location: locationResult,
//       details: detailsResult
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
