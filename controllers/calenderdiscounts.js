const CalenderDiscounts = require("../models/CalenderDiscounts");
const Restaurants = require("../models/Restaurants");

// @desc      Add  CalenderDiscounts menu
// @route    api/Calenderdiscounts/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    const { start_date, end_date, people, full_day, morning, lunch, dinner } =
      req.body; // Getting discount filed in req.body

    const { restaurantId } = req.params; // gettign restaurant id params
    const restaurantIdCheck = await Restaurants.findById(restaurantId); // check restaurant id if NOT exist
    if (!restaurantIdCheck) {
      return res.status(404).json({
        success: false,
        message: `No restaurant Found !!!`,
      });
    }

    req.body.restaurant = restaurantId;
    const calenderdiscounts = await CalenderDiscounts.create(req.body); // save SpecialMenu
    await Restaurants.findByIdAndUpdate(
      //   menu push in restaurant array
      restaurantIdCheck,

      { $push: { calender_discounts: calenderdiscounts._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: calenderdiscounts,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// // I think this code is optional

// @desc      Get  CalenderDiscounts
// @route     GET api/calenderdiscounts
// @route     GET /api/restaurant/:restaurantId/catrgories
// @access    Public
exports.getCalenderDiscount = async (req, res) => {
  try {
    // let query;
    // query = CalenderDiscounts.find();
    // const calenderdiscounts = await query;

    const { restaurantId } = req.params;
    const calenderdiscounts = await CalenderDiscounts.find({
      restaurant: restaurantId,
    }).populate("discount");

    res.status(200).json({
      success: true,
      count: calenderdiscounts.length,
      data: calenderdiscounts,
    }); /// success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get single CalenderMenus
// @route     GET /api/v1/calendermenus/:id
// @access    Public
exports.getCalenderDiscounSingle = async (req, res) => {
  try {
    const calenderdiscounts = await CalenderDiscounts.findById(req.params.id);

    if (!calenderdiscounts) {
      return res.status(404).json({
        success: false,
        message: `No calender discounts with the id of ${calenderdiscounts}`,
      });
    }

    res.status(200).json({
      success: true,
      data: calenderdiscounts, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update CalenderMenus
// @route     PUT api/calendermenus/:id
// @access    Private
exports.updateCalenderDiscoun = async (req, res) => {
  try {
    let calenderdiscounts = await CalenderDiscounts.findById(req.params.id);
    if (!calenderdiscounts) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${req.params.id}`,
      });
    }

    calenderdiscounts = await CalenderDiscounts.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: calenderdiscounts,
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
exports.deleteCalenderDiscounts = async (req, res) => {
  try {
    const calenderdiscounts = await CalenderDiscounts.findById(req.params.id);

    if (!calenderdiscounts) {
      return res.status(404).json({
        success: false,
        message: `No calendarmneu with the id of ${req.params.id}`,
      });
    }
    await calenderdiscounts.remove();

    await Restaurants.findByIdAndUpdate(
      // Catrgories push in restaurant array
      calenderdiscounts.restaurant,

      { $push: { calender_discounts: calenderdiscounts._id } },
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
