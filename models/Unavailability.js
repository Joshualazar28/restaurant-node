/**
 * Unavailability Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const unavailabilitySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    day_off: {
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
module.exports = model("unavailability", unavailabilitySchema);
