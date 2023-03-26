/**
 * Restaurant controllers
 * @author Yousuf Kalim
 */
const Restaurants = require("../models/Restaurants");

//
// change
const Menus = require("../models/Menus");
const Categories = require("../models/Categories");
const Unavailability = require("../models/Unavailability");
const Specialmenus = require("../models/SpecialMenus");
const discounts = require("../models/Discounts");
const Calendermenus = require("../models/CalenderMenus");
const Calenderdiscounts = require("../models/CalenderDiscounts");
/**
 * GET Restaurant by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurants.findById(restaurantId)
      .populate({
        path: "menus",
        // populate: {
        //   path: "category",
        // },
      })
      .populate("categories")
      .populate("unavailability")
      // .populate("special_menus") // mistake

      .populate("special_menus")

      .populate("discounts")
      .populate({
        path: "calender_menus", // mistake
        // path: "calenderMenus",
        // populate: {
        //   path: "menus",
        // },
      })
      .populate({
        path: "calender_discounts", //  mistake
        // path: "calenderDiscounts",

        populate: {
          path: "discount",
        },
      });

    res.json({ success: true, restaurant });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update restaurant
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const { restaurantId } = req.params; // Getting restaurant id from URL parameter

    const restaurant = await Restaurants.findByIdAndUpdate(
      restaurantId,
      req.body,
      {
        new: true,
      }
    ); // Updating the restaurant

    res.json({ success: true, restaurant }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
