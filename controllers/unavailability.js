const Unavailability = require("../models/Unavailability");
const Restaurants = require("../models/Restaurants");

// @desc      Add  unavailability menu
// @route    api/unavailability/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    const { date, date_off, morning, lunch, dinner } = req.body; // Getting discount filed in req.body

    const { restaurantId } = req.params; // gettign restaurant id params
    const restaurantIdCheck = await Restaurants.findById(restaurantId); // check restaurant id if NOT exist
    if (!restaurantIdCheck) {
      return res.status(404).json({
        success: false,
        message: `No restaurant Found !!!`,
      });
    }

    req.body.restaurant = restaurantId;
    const unavailability = await Unavailability.create(req.body); // save SpecialMenu
    await Restaurants.findByIdAndUpdate(
      //   menu push in restaurant array
      restaurantIdCheck,

      { $push: { unavailability: unavailability._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: req.body,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// // I think this code is optional  ///

// @desc      Get  unavailability
// @route     GET api/unavailability
// @route     GET /api/restaurant/:restaurantId/catrgories
// @access    Public
exports.getUnavailability = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const unavailability = await Unavailability.find({
      restaurant: restaurantId,
    });
    res.status(200).json({
      success: true,
      count: unavailability.length,
      data: unavailability,
    }); /// success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//   i think this code is very optional

// @desc      Get single CalenderMenus
// @route     GET /api/v1/calendermenus/:id
// @access    Public
exports.getUnavailabilitySingle = async (req, res) => {
  try {
    const unavailability = await Unavailability.findById(req.params.id);

    if (!unavailability) {
      return res.status(404).json({
        success: false,
        message: `No unavailability with the id of ${unavailability}`,
      });
    }

    res.status(200).json({
      success: true,
      data: unavailability, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update unavailability
// @route     PUT api/unavailability/:id
// @access    Private
exports.updateUnavailability = async (req, res) => {
  try {
    let unavailability = await Unavailability.findById(req.params.id);
    if (!unavailability) {
      return res.status(404).json({
        success: false,
        message: `No unavailability with the id of ${req.params.id}`,
      });
    }

    unavailability = await Unavailability.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: unavailability,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Delete category
// @route     DELETE /api/v1/category/:id
// @access    Private
exports.deleteUnavailability = async (req, res) => {
  try {
    const unavailability = await Unavailability.findById(req.params.id);

    if (!unavailability) {
      return res.status(404).json({
        success: false,
        message: `No calendarmneu with the id of ${req.params.id}`,
      });
    }
    await unavailability.remove();

    await Restaurants.findByIdAndUpdate(
      // Catrgories push in restaurant array
      unavailability.restaurant,

      { $push: { unavailability: Unavailability._id } },
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
