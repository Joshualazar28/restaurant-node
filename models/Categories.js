/**
 * Categories Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: String,
    active: {
      type: Boolean,
      default: true,
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
module.exports = model("categories", categoriesSchema);
