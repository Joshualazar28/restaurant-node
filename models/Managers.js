/**
 * Managers Schema
 * @author Yousuf Kalim
 */
const { Schema, model } = require("mongoose");

// Schema
const managersSchema = new Schema(
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
    businessType: {
      type: String,
      required: true,
      enum: ["restaurant", "home chef"],
      default: "manager",
    },
    role: {
      type: String,
      required: true,
      enum: ["manager", "employee"],
      default: "manager",
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
module.exports = model("managers", managersSchema);
