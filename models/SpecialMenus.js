/**
 * SpecialMenus Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const specialMenusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    min_persons: {
      type: Number,
      required: true,
    },
    max_persons: {
      type: Number,
      required: true,
    },
    description: String,
    comment: String,
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
module.exports = model("specialMenus", specialMenusSchema);
