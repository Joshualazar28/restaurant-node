const Unavailability = require("../models/Restaurants");
const Restaurants = require("../models/Restaurants");

// @desc      Add  unavailability menu
// @route    api/unavailability/:restaurantId
// @access    Private

exports.create = async (req, res) => {
  try {
    // const result = await Restaurants.create(availabilities);
    const { restaurantId } = req.params; // gettign restaurant id params
    const restaurantIdCheck = await Restaurants.findByIdAndUpdate(
      restaurantId,
      req.body,
      { new: true }
    ); // check restaurant id if NOT exist
    res.status(200).json({
      success: true,
      data: restaurantIdCheck,
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
// exports.getUnavailability = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const unavailability = await Unavailability.find({
//       restaurant: restaurantId,
//     });
//     res.status(200).json({
//       success: true,
//       count: unavailability.length,
//       data: unavailability,
//     }); /// success
//   } catch (err) {
//     // Error handling
//     console.log("Error ----> ", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

//   i think this code is very optional

// @desc      Get single CalenderMenus
// @route     GET /api/v1/calendermenus/:id
// @access    Public
// exports.getUnavailabilitySingle = async (req, res) => {
//   try {
//     const unavailability = await Unavailability.findById(req.params.id);

//     if (!unavailability) {
//       return res.status(404).json({
//         success: false,
//         message: `No unavailability with the id of ${unavailability}`,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: unavailability, // success
//     });
//   } catch (err) {
//     // Error handling
//     console.log("Error ----> ", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // @desc      Update unavailability
// // @route     PUT api/unavailability/:id
// // @access    Private
// exports.updateUnavailability = async (req, res) => {
//   try {
//     let unavailability = await Unavailability.findById(req.params.id);
//     if (!unavailability) {
//       return res.status(404).json({
//         success: false,
//         message: `No unavailability with the id of ${req.params.id}`,
//       });
//     }

//     unavailability = await Unavailability.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.status(200).json({
//       success: true,
//       data: unavailability,
//     });
//   } catch (err) {
//     // Error handling
//     console.log("Error ----> ", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // @desc      Delete category
// // @route     DELETE /api/v1/category/:id
// // @access    Private
// exports.deleteUnavailability = async (req, res) => {
//   try {
//     const unavailability = await Unavailability.findById(req.params.id);

//     if (!unavailability) {
//       return res.status(404).json({
//         success: false,
//         message: `No calendarmneu with the id of ${req.params.id}`,
//       });
//     }
//     await unavailability.remove();

//     await Restaurants.findByIdAndUpdate(
//       // Catrgories push in restaurant array
//       unavailability.restaurant,

//       { $push: { unavailability: Unavailability._id } },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json({
//       success: true,
//       data: {},
//     });
//   } catch (err) {
//     // Error handling
//     console.log("Error ----> ", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
