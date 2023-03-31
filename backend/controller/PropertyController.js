const Property = require("../models/PropertyModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const axios = require("axios");
// create Product --Admin
exports.createProperty = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "properties",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    property,
  });
});

// Get All Product (Admin)
exports.getAdminProperties = catchAsyncErrors(async (req, res, next) => {
  const properties = await Property.find();

  res.status(200).json({
    success: true,
    properties,
  });
});

// get All Products
exports.getAllProperties = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const propertiesCount = await Property.countDocuments();

  const apiFeature = new ApiFeatures(Property.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const properties = await apiFeature.execute();

  const filteredPropertiesCount = properties.length;

  res.status(200).json({
    success: true,
    properties,
    propertiesCount,
    resultPerPage,
    filteredPropertiesCount,
  });
});

exports.getPropertyDetails = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// Update Property ---Admin
exports.updateProperty = catchAsyncErrors(async (req, res, next) => {
  let property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("Property not found.", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Delete image from cloudinary
    for (let i = 0; i < property.images.length; i++) {
      await cloudinary.v2.uploader.destroy(property.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const output = await cloudinary.v2.uploader.upload(images[i], {
        folder: "properties",
      });
      imagesLinks.push({
        public_id: output.public_id,
        url: output.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete Product
exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found.", 404));
  }

  // Deleting images from cloudinary
  for (let i = 0; 1 < property.images.length; i++) {
    const output = await cloudinary.v2.uploader.destroy(
      property.images[i].public_id
    );
  }

  await property.remove();

  res.status(200).json({
    success: true,
    message: "Property deleted succesfully",
  });
});

// single Product details
exports.getSingleProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("Property not found.", 404));
  }
  res.status(200).json({
    success: true,
    property,
  });
});


exports.getPropertyLocation = async (req, res, next) => {
  const address = req.params.address;
  const AMENITY_CATEGORIES = ["hospital", "park", "restaurant","mart"];
  function haversine(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
  try {
    const property = await Property.findOne({ address: address });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      property.address
    )}.json?access_token=pk.eyJ1IjoicHJhdGVlazE2NDkiLCJhIjoiY2w5ZHVicmM4MGJ3YTNvcDlhemhxMXh4NiJ9.pPca72n4BLDfidsxfvd9Ag`;

    const geocodeResponse = await axios.get(geocodeUrl);
    const geocodeData = geocodeResponse.data;

    if (!geocodeData.features || geocodeData.features.length === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    const longitude = geocodeData.features[0].center[0];
    const latitude = geocodeData.features[0].center[1];

    const amenities = await Promise.all(
      AMENITY_CATEGORIES.map(async (category) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${category}&key=AIzaSyCETfYHnB3ZszmOzR7br1tWUSI7XpBwJk4`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.results || data.results.length === 0) {
          return null;
        }

        const amenities = data.results.map((result) => ({
          name: result.name,
          distance: result.vicinity,
          location: {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          },
        }));

        const closestAmenity = amenities.reduce((prev, curr) => {
          const prevDistance = haversine(
            latitude,
            longitude,
            prev.location.latitude,
            prev.location.longitude
          );
          const currDistance = haversine(
            latitude,
            longitude,
            curr.location.latitude,
            curr.location.longitude
          );

          return prevDistance < currDistance ? prev : curr;
        });

        return { category: category, ...closestAmenity };
      })
    );

    const validAmenities = amenities.filter((amenity) => amenity !== null);

    res.json({
      amenities: validAmenities,
      longitude: longitude,
      latitude: latitude,
    });
  } catch (error) {
    next(error);
  }
};

// exports.getPropertyAmenities = async (req, res, next) => {
//   const address = req.params.address;
//   const AMENITY_CATEGORIES = ["hospital", "park", "restaurant","mart"];
//   function haversine(lat1, lon1, lat2, lon2) {
//     const toRadians = (degrees) => (degrees * Math.PI) / 180;
//     const R = 6371; // Earth's radius in kilometers
//     const φ1 = toRadians(lat1);
//     const φ2 = toRadians(lat2);
//     const Δφ = toRadians(lat2 - lat1);
//     const Δλ = toRadians(lon2 - lon1);

//     const a =
//       Math.sin(Δφ / 2) ** 2 +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   }
//   try {
//     const property = await Property.findOne({ address: address });

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       property.address
//     )}.json?access_token=pk.eyJ1IjoicHJhdGVlazE2NDkiLCJhIjoiY2w5ZHVicmM4MGJ3YTNvcDlhemhxMXh4NiJ9.pPca72n4BLDfidsxfvd9Ag`;

//     const geocodeResponse = await axios.get(geocodeUrl);
//     const geocodeData = geocodeResponse.data;

//     if (!geocodeData.features || geocodeData.features.length === 0) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     const longitude = geocodeData.features[0].center[0];
//     const latitude = geocodeData.features[0].center[1];

//     const amenities = await Promise.all(
//       AMENITY_CATEGORIES.map(async (category) => {
//         const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${category}&key=AIzaSyCETfYHnB3ZszmOzR7br1tWUSI7XpBwJk4`;

//         const response = await axios.get(url);
//         const data = response.data;

//         if (!data.results || data.results.length === 0) {
//           return null;
//         }

//         const amenities = data.results.map((result) => ({
//           name: result.name,
//           distance: result.vicinity,
//           location: {
//             latitude: result.geometry.location.lat,
//             longitude: result.geometry.location.lng,
//           },
//         }));

//         const closestAmenity = amenities.reduce((prev, curr) => {
//           const prevDistance = haversine(
//             latitude,
//             longitude,
//             prev.location.latitude,
//             prev.location.longitude
//           );
//           const currDistance = haversine(
//             latitude,
//             longitude,
//             curr.location.latitude,
//             curr.location.longitude
//           );

//           return prevDistance < currDistance ? prev : curr;
//         });

//         return { category: category, ...closestAmenity };
//       })
//     );

//     const validAmenities = amenities.filter((amenity) => amenity !== null);

//     res.json({
//       amenities: validAmenities,
//       longitude: longitude,
//       latitude: latitude,
//       property,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getPropertyLocation = async (req, res, next) => {
//   const address = req.params.address; // get the address parameter from the request

//   try {
//     // find the property with the given address
//     const property = await Property.findOne({ address: address });

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     // fetch the longitude and latitude of the property's address using Google Geocoding API
//     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       property.address
//     )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

//     const geocodeResponse = await axios.get(geocodeUrl);
//     const geocodeData = geocodeResponse.data;
//     if (!geocodeData.results || geocodeData.results.length === 0) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     const longitude = geocodeData.results[0].geometry.location.lng;
//     const latitude = geocodeData.results[0].geometry.location.lat;

//     // use the property's location to query Google Places API for nearby amenities
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=hospital|park|restaurant|shopping_mall&key=${process.env.GOOGLE_MAPS_API_KEY}`;

//     const response = await axios.get(url); // send the request to Google Places API
//     const data = response.data; // parse the response JSON

//     // extract the relevant data from the response and add the distance to each amenity
//     const amenities = data.results.map((result) => ({
//       name: result.name,
//       category: result.types[0],
//       distance: result.vicinity,
//     }));

//     // send the amenities back to the client
//     res.json({ amenities: amenities });
//   } catch (error) {
//     next(error);
//   }
// };
