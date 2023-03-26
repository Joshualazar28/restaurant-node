const CalenderMenus = require("../models/CalenderMenus");
const Restaurants = require("../models/Restaurants");

// @desc      Add  calender menus menu
// @route    api/calendermenus/:restaurantId
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
    const calendermenus = await CalenderMenus.create(req.body); // save SpecialMenu
    await Restaurants.findByIdAndUpdate(
      //   menu push in restaurant array
      restaurantIdCheck,

      { $push: { calender_menus: calendermenus._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: calendermenus,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// I think this code is optional

// @desc      Get calender menus
// @route     GET api/calendermenus
// @route     GET /api/restaurant/:restaurantId/catrgories
// @access    Public
exports.getCalenderMenus = async (req, res) => {
  try {
    // let query;
    // query = CalenderMenus.find();
    // const calendermenus = await query;
    const { restaurantId } = req.params;
    const calendermenus = await CalenderMenus.find({
      restaurant: restaurantId,
    })
      .populate("menus")
      .sort("-createdAt");
    res.status(200).json({
      success: true,
      count: calendermenus.length,
      data: calendermenus,
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
exports.getCalenderMenusSingle = async (req, res) => {
  try {
    const calendermenus = await CalenderMenus.findById(req.params.id);

    if (!calendermenus) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${calendermenus}`,
      });
    }

    res.status(200).json({
      success: true,
      data: calendermenus, // success
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
exports.updateCalenderMenus = async (req, res) => {
  try {
    let calendermenus = await CalenderMenus.findById(req.params.id);
    if (!calendermenus) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${req.params.id}`,
      });
    }

    calendermenus = await CalenderMenus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: calendermenus,
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
exports.deleteCalenderMenu = async (req, res) => {
  try {
    const calendermenus = await CalenderMenus.findById(req.params.id);

    if (!calendermenus) {
      return res.status(404).json({
        success: false,
        message: `No calendarmneu with the id of ${req.params.id}`,
      });
    }
    await calendermenus.remove();

    await Restaurants.findByIdAndUpdate(
      // Catrgories push in restaurant array
      calendermenus.restaurant,

      { $pull: { calender_menus: calendermenus._id } },
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
