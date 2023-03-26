/**
 * Discounts Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const discountsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
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
module.exports = model("discounts", discountsSchema);
