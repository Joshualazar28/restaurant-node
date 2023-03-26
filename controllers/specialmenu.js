const SpecialMenu = require("../models/SpecialMenus");
const Restaurants = require("../models/Restaurants");

// @desc      Add  sepcial menu
// @route    api/specialmenus/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    const { name, price, min_persons, max_persons, description, comment } =
      req.body; // Getting specialmenu filed in req.body

    const { restaurantId } = req.params; // gettign restaurant id params
    console.log(restaurantId);
    const restaurantIdCheck = await Restaurants.findById(restaurantId); // check restaurant id if NOT exist
    if (!restaurantIdCheck) {
      return res.status(404).json({
        success: false,
        message: `No restaurant Found !!!`,
      });
    }

    req.body.restaurant = restaurantId;
    const specialmenu = await SpecialMenu.create(req.body); // save SpecialMenu
    await Restaurants.findByIdAndUpdate(
      // menu push in restaurant array
      restaurantIdCheck,

      { $push: { special_menus: specialmenu._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: specialmenu,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get SpecialMenu
// @route     GET api/category
// @route     GET /api/restaurant/:restaurantId/catrgories
// @access    Public
exports.getSpecialMenu = async (req, res) => {
  try {
    // let query;
    // query = SpecialMenu.find();
    // const specialmenu = await query;

    const { restaurantId } = req.params;

    const specialmenu = await SpecialMenu.find({
      restaurant: restaurantId,
    });

    res
      .status(200)
      .json({ success: true, count: specialmenu.length, specialmenu }); /// success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get single category
// @route     GET /api/specialmenu/:id
// @access    Public
exports.getSingleSpecaiMenu = async (req, res) => {
  try {
    const specialmenu = await SpecialMenu.findById(req.params.id);

    if (!specialmenu) {
      return res.status(404).json({
        success: false,
        message: `No Special menu Found  `,
      });
    }

    res.status(200).json({
      success: true,
      specialmenu, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update special menu
// @route     PUT api/specialmenu/:id
// @access    Private
exports.updateSpecailMenu = async (req, res) => {
  try {
    let specialmenu = await SpecialMenu.findById(req.params.id);
    if (!specialmenu) {
      return res.status(404).json({
        success: false,
        message: `No special menu Found !!!`,
      });
    }

    specialmenu = await SpecialMenu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: specialmenu,
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
exports.deleteSpecailMenu = async (req, res) => {
  try {
    const specialmenu = await SpecialMenu.findById(req.params.id);

    if (!specialmenu) {
      return res.status(404).json({
        success: false,
        message: `No specialmenu id Found !`,
      });
    }
    await specialmenu.remove();

    await Restaurants.findByIdAndUpdate(
      // special menu push in restaurant array

      specialmenu.restaurant,

      { $pull: { special_menus: specialmenu._id } },
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
