/**
 * CalenderDiscounts Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const calenderDiscountsSchema = new Schema(
  {
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    types: {
      type: String,
      default: "",
    },
    people: [
      {
        type: Number,
      },
    ],
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
    discount: {
      type: Schema.Types.ObjectId,
      ref: "discounts",
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
module.exports = model("calenderDiscounts", calenderDiscountsSchema);
