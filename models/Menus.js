/**
 * Menus Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const menusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    description: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },

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
module.exports = model("menus", menusSchema);
