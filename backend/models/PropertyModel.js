const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyTitle: {
    type: String,
    required: [true, "Please enter Listing Name."],
    trim: true,
    maxLength: [30, "Product name not exceed than 30 characters."],
  },
  propertyType: {
    type: String,
    enum: ["Sale", "Rent"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Bungalow", "Apartment", "Villa","Commercial"],
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description of your Listing"],
    maxlength: [4500, "Description is can not exceed than 4500 characters."],
  },
  address: {
    type: String,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please add a price for your Listing"],
    maxLength: [8, "Price can not exceed than 8 characters."],
  },
  propertyFace: {
    type: String,
    required: true,
  },
  buildYear: {
    type: String,
    required: true,
  },

  areaSqFt: {
    type: Number,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  isFurnished: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Property", propertySchema);
