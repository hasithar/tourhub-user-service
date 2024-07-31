const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define name schema
const nameSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, sparse: true },
    initials: { type: String, sparse: true },
    displayName: { type: String, sparse: true },
  },
  { _id: false }
);

// define location schema
const locationSchema = new Schema(
  {
    address: {
      type: String,
      sparse: true,
    },
    city: {
      type: String,
      sparse: true,
    },
    province: {
      type: String,
      sparse: true,
    },
    postalCode: {
      type: String,
      sparse: true,
    },
    country: {
      type: String,
      sparse: true,
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        sparse: true,
      },
      coordinates: {
        type: [Number],
        sparse: true,
      },
    },
  },
  { _id: false }
);

// define contact details schema
const contactDetailsSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

// define profile schema
const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: nameSchema,
    bio: String,
    contactDetails: contactDetailsSchema,
    permamentAddress: locationSchema,
    currentAddress: locationSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// create profile model
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
