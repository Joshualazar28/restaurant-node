/**
 * CalenderMenus Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const calenderMenusSchema = new Schema(
  {
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    people: [
      {
        type: Number,
      },
    ],
    types: {
      type: String,
      default: "",
    },

    full_day: {
      type: Boolean,
      default: false,
    },
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
    menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "specialMenus",
      },
    ],
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model("calenderMenus", calenderMenusSchema);
