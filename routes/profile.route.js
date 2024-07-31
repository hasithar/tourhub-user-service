var express = require("express");
var router = express.Router();
const {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");

// get all items
router.get("/", getAllProfiles);

// get single item
router.get("/:id", getProfile);

// create item
router.post("/", createProfile);

// update item
router.patch("/:id", updateProfile);

// delete item
router.delete("/:id", deleteProfile);

module.exports = router;
