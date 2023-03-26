const Menus = require("../models/Menus");
const Restaurants = require("../models/Restaurants");

// @desc      Add menus
// @route    api/menus/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    const { name, price, description, active } = req.body; // Getting menu filed in req.body

    const { restaurantId } = req.params; // gettign restaurant id params
    console.log(restaurantId);
    const restaurantIdCheck = await Restaurants.findById(restaurantId); // check restaurant id if exist
    if (!restaurantIdCheck) {
      return res.status(404).json({
        success: false,
        message: `No restaurant with the id of ${restaurantId}`,
      });
    }

    req.body.restaurant = restaurantId;
    const menus = await Menus.create(req.body); // save menu
    await Restaurants.findByIdAndUpdate(
      // menu push in restaurant array
      restaurantIdCheck,

      { $push: { menus: menus._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: menus,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get  all menus
// @route     GET api/menus
// @route     GET /api/menus/:restaurantId
// @access    Public
exports.getMenus = async (req, res) => {
  try {
    // let query;
    // query = Menus.find();
    // const menus = await query;
    const { restaurantId } = req.params;

    const menus = await Menus.find({
      restaurant: restaurantId,
    }).populate("category");

    res.status(200).json({ success: true, count: menus.length, menus }); /// success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get single menus
// @route     GET /api/menu/:id
// @access    Public
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menus.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: `No menus with the id of ${menu}`,
      });
    }

    res.status(200).json({
      success: true,
      data: menu, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update menus
// @route     PUT api/menu/:id
// @access    Private
exports.updateMenu = async (req, res) => {
  try {
    let menu = await Menus.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: `No menu with the id of ${req.params.id}`,
      });
    }

    menu = await Menus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Delete menus
// @route     DELETE /api/v1/menu/:id
// @access    Private
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menus.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: `No menu with the id of ${req.params.id}`,
      });
    }
    await menu.remove();

    await Restaurants.findByIdAndUpdate(
      // menu push in restaurant array
      menu.restaurant,

      { $pull: { menus: menu._id } },
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
