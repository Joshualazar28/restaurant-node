/**
 * Managers Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const employee = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ["employee"],
      default: "employee",
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model("employee", employee);
