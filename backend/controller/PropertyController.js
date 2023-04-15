const Property = require("../models/PropertyModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures.js");
const cloudinary = require("cloudinary");
const axios = require("axios");
const AWS = require("aws-sdk");
const {
  aws,
  adminEmail,
  amentiesConfig,
  mapboxConfig,
} = require("../config/.config");

AWS.config.update(aws);
const { v4: uuidv4 } = require("uuid");
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.createProperty = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images?.length; i++) {
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
  } catch (err) {
    console.log(err);
  }
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
    property,
  });
});

// delete Product
exports.deleteProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found.", 404));
  }

  // Deleting images from cloudinary
  for (let i = 0; i < property.images.length; i++) {
    const output = await cloudinary.v2.uploader.destroy(
      property.images[i].public_id
    );
  }

  await property.remove();

  res.status(200).json({
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

// get All Properties
exports.getAllProperties = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const propertiesCount = await Property.countDocuments();

  const feature = new ApiFeatures(Property.find(), req.query)
    .search()
    .filter()
    .sort()
    .pagination(resultPerPage);

  const properties = await feature.query;

  res.status(200).json({
    success: true,
    properties,
    propertiesCount,
    resultPerPage,
  });
});

exports.getRentalProperties = async (req, res, next) => {
  try {
    const rentalProperties = await Property.find({ propertyType: "Rent" });
    res.status(200).json({
      success: true,
      data: rentalProperties,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSaleProperties = async (req, res, next) => {
  try {
    const saleProperties = await Property.find({ propertyType: "Sale" });
    res.status(200).json({
      success: true,
      data: saleProperties,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.params.id });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

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


exports.getTopListings = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 4;

  const apiFeature = new ApiFeatures(
    Property.find().sort({createAt: -1}).limit(resultPerPage),
    req.query
  );

  const topListings = await apiFeature.execute();

  res.status(200).json({
    success: true,
    topListings,
  });
});


exports.getPropertyLocation = async (req, res, next) => {
  const propertyId = req.params.id;
  const AMENITY_CATEGORIES = ["hospital", "park", "restaurant", "super market"];
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
    const property = await Property.findById(propertyId);

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

    // const allAmenities = await Promise.all(
    //   AMENITY_CATEGORIES.map(async (category) => {
    //     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${category}&key=`;

    //     const response = await axios.get(url);
    //     const data = response.data;
    //     if (!data.results || data.results.length === 0) {
    //       return null;
    //     }
    //     return {
    //       allAmenities: data.results,
    //     };
    //   })
    // );
    const amenities = await Promise.all(
      AMENITY_CATEGORIES.map(async (category) => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${category}&key=AIzaSyDDSbDmkmufM1u4uwfMKkPAunPDKSZ7LzM`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.results || data.results.length === 0) {
          return null;
        }

        const amenities = data.results.map((result) => ({
          name: result.name,
          distance: (
            haversine(
              latitude,
              longitude,
              result.geometry.location.lat,
              result.geometry.location.lng
            ) * 1000
          ).toFixed(2),
          location: {
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
          },
        }));

        const closestAmenity = amenities.reduce((prev, curr) => {
          const prevDistance = prev.distance;
          const currDistance = curr.distance;

          return prevDistance < currDistance ? prev : curr;
        });

        return {
          category: category,
          name: closestAmenity.name,
          distance: closestAmenity.distance,
          location: closestAmenity.location,
        };
      })
    );

    const validAmenities = amenities.filter((amenity) => amenity !== null);
    res.json({
      amenities:amenities,
      longitude: longitude,
      latitude: latitude,
      property,
    });
  } catch (error) {
    next(error);
  }
};

exports.sendAgentEmail = async (req, res) => {
  const { name, email, message, propertyId } = req.body;

  try {
    // Get the agent email from the property schema
    const property = await Property.findById(propertyId).populate("user");
    const agentEmail = property.user.email;
    console.log(agentEmail);
    // Construct the email message
    const params = {
      Destination: {
        ToAddresses: [agentEmail],
      },
      Message: {
        Body: {
          Text: {
            Data: message,
          },
        },
        Subject: {
          Data: `Message from :${name} Email: (${email})`,
        },
      },
      Source: "Prateekshrestha1649@gmail.com",
    };

    // Send the email
    const result = await ses.sendEmail(params).promise();

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
