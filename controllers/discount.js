const Discounts = require("../models/Discounts");
const Restaurants = require("../models/Restaurants");

// @desc      Add  discount menu
// @route    api/discounts/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    const { name, discount, comment } = req.body; // Getting discount filed in req.body

    const { restaurantId } = req.params; // gettign restaurant id params

    const restaurantIdCheck = await Restaurants.findById(restaurantId); // check restaurant id if NOT exist
    if (!restaurantIdCheck) {
      return res.status(404).json({
        success: false,
        message: `No restaurant Found !!!`,
      });
    }

    req.body.restaurant = restaurantId;
    const discounts = await Discounts.create(req.body); // save SpecialMenu
    await Restaurants.findByIdAndUpdate(
      // menu push in restaurant array
      restaurantIdCheck,

      { $push: { discounts: discounts._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: discounts,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get dsicount
// @route     GET api/category
// @route     GET /api/restaurant/:restaurantId/catrgories
// @access    Public
exports.getDiscounts = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const discounts = await Discounts.find({
      restaurant: restaurantId,
    });
    res.status(200).json({ success: true, count: discounts.length, discounts }); /// success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get single category
// @route     GET /api/discounts/:id
// @access    Public
exports.getSingleDiscount = async (req, res) => {
  try {
    const discounts = await Discounts.findById(req.params.id);

    if (!discounts) {
      return res.status(404).json({
        success: false,
        message: `No Special menu Found  `,
      });
    }

    res.status(200).json({
      success: true,
      data: discounts, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update discounts menu
// @route     PUT api/discounts/:id
// @access    Private
exports.updateDiscountslMenu = async (req, res) => {
  try {
    let discounts = await Discounts.findById(req.params.id);
    if (!discounts) {
      return res.status(404).json({
        success: false,
        message: `No special discounts menu Found !!!`,
      });
    }

    discounts = await Discounts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: discounts,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Delete special menu
// @route     DELETE /api/specialmenu/:id
// @access    Private
exports.deleteDiscountslMenu = async (req, res) => {
  try {
    const discounts = await Discounts.findById(req.params.id);

    if (!discounts) {
      return res.status(404).json({
        success: false,
        message: `No Discounts id Found !`,
      });
    }
    await discounts.remove();

    await Restaurants.findByIdAndUpdate(
      // special menu push in restaurant array

      discounts.restaurant,

      { $pull: { discounts: discounts._id } },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
