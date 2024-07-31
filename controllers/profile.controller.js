const Profile = require("./../models/profile.model");

/* get all items
 *--------------------------------------------- */
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* get single item
 *--------------------------------------------- */
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* create item
 *--------------------------------------------- */
const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* update item
 *--------------------------------------------- */
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    const updatedProfile = await Profile.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* delete item
 *--------------------------------------------- */
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json({ message: "Profile deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
