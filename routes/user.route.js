var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/user.controller");

// get all items
router.get("/", getAllUsers);

// get single item
router.get("/:id", getUser);

// create item
router.post("/", createUser);

// update item
router.patch("/:id", updateUser);

// delete item
router.delete("/:id", deleteUser);

module.exports = router;
