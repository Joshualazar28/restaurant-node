const Categories = require("../models/Categories");
const Restaurants = require("../models/Restaurants");

// @desc      Add categories
// @route    api/categories
// @access    Private
exports.create = async (req, res) => {
  try {
    const { name, comment, active } = req.body; // Getting catgegory

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

    const categories = await Categories.create(req.body); // save categories
    await Restaurants.findByIdAndUpdate(
      // Catrgories push in restaurant array
      restaurantIdCheck,

      { $push: { categories: categories._id } },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: categories,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get categories
// @route     GET api/categories
// @route     GET /api/v1/categories/:restaurantId
// @access    Public

exports.getCategories = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const categories = await Categories.find({
      restaurant: restaurantId,
    });

    res
      .status(200)
      .json({ success: true, count: categories.length, categories });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Get single categories
// @route     GET /api/categories/:id
// @access    Public
exports.getSingleCategory = async (req, res) => {
  try {
    const categories = await Categories.findById(req.params.id);

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: categories, // success
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc      Update categories
// @route     PUT api/categories/:id
// @access    Private
exports.updateCategories = async (req, res) => {
  try {
    let category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${req.params.id}`,
      });
    }

    category = await Categories.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: category,
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
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `No category with the id of ${req.params.id}`,
      });
    }
    await category.remove();

    await Restaurants.findByIdAndUpdate(
      // Catrgories push in restaurant array
      category.restaurant,

      { $pull: { categories: category._id } },
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
