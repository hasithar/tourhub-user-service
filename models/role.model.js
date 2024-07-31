const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define role schema
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSsoEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create role model
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
