var express = require("express");
var router = express.Router();
const {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("./../controllers/role.controller");

// get all items
router.get("/", getAllRoles);

// get single item
router.get("/:id", getRole);

// create item
router.post("/", createRole);

// update item
router.patch("/:id", updateRole);

// delete item
router.delete("/:id", deleteRole);

module.exports = router;
