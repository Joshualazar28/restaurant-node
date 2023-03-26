/**
 * Restaurants Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const restaurantsSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      lowercase: true,
    },
    zipcode: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },

    numberOfPeople: {
      type: Number,
      // required: true,
    },

    country: {
      type: String,
      // required: true,
    },

    availabilities: {
      morning: [
        {
          type: String,
        },
      ],
      lunch: [
        {
          type: String,
        },
      ],
      dinner: [
        {
          type: String,
        },
      ],
    },

    address: String,
    state: String,
    description: String,
    phone: Number,

    //   Relations start here
    menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "menus",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
    unavailability: [
      {
        type: Schema.Types.ObjectId,
        ref: "unavailability",
      },
    ],
    special_menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "specialMenus",
      },
    ],
    discounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "discounts",
      },
    ],
    calender_menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "calenderMenus",
      },
    ],
    calender_discounts: [
      {
        type: Schema.Types.ObjectId,
        // ref: "calender_discounts",
        ref: "calenderDiscounts",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model("restaurants", restaurantsSchema);
