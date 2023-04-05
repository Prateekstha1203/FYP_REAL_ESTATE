const Wishlist = require('../models/WishListModel');
const Property = require('../models/PropertyModel');
const user = require('../models/UserModel')

exports.addToWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      const newWishlist = new Wishlist({
        user: req.user.id,
        properties: [req.params.id],
      });

      await newWishlist.save();

      return res.status(201).json({
        success: true,
        message: 'Property added to new wishlist successfully',
        wishlist: newWishlist,
      });
    }

    if (wishlist.properties.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'This property is already in your wishlist',
      });
    }

    wishlist.properties.push(req.params.id);

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Property added to wishlist successfully',
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'No wishlist found',
      });
    }

    const propertyIndex = wishlist.properties.indexOf(req.params.id);

    if (propertyIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'This property is not in your wishlist',
      });
    }

    wishlist.properties.splice(propertyIndex, 1);

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Property removed from wishlist successfully',
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id }).populate(
      'properties'
    );

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'No wishlist found',
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};