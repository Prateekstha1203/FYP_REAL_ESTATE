const Property = require("../models/PropertyModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

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
  const property= await Property.findById(req.params.id);

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

// Create New Review or Update the review
// exports.createPropertyReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, propertyId } = req.body;

//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const product = await Product.findById(productId);

//   const isReviewed = product.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     product.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//   }

//   let avg = 0;

//   product.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   product.ratings = avg / product.reviews.length;

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Get All reviews of a single product
// exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.id);

//   if (!product) {
//     return next(new ErrorHandler("Product is not found with this id", 404));
//   }

//   res.status(200).json({
//     success: true,
//     reviews: product.reviews,
//   });
// });

// // Delete Review --Admin
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//     return next(new ErrorHandler("Product not found with this id", 404));
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   let ratings = 0;

//   if (reviews.length === 0) {
//     ratings = 0;
//   } else {
//     ratings = avg / reviews.length;
//   }

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//   });
// });

// 