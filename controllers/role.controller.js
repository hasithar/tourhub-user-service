const Role = require("./../models/role.model");

/* get all items
 *--------------------------------------------- */
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(id, req.body);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    const updatedRole = await Role.findById(id);
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(200).json({ message: "Role deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
