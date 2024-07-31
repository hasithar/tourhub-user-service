const Role = require("./../models/role.model");

// sample data
const roles = [
  {
    name: "Admin",
    description: "Full access to all features and settings.",
    isActive: true,
    isSsoEnabled: false,
  },
  {
    name: "Manager",
    description:
      "Manage operations and staff, with limited access to settings.",
    isActive: true,
    isSsoEnabled: true,
  },
  {
    name: "TourGuide",
    description: "Access to tour schedules and customer information.",
    isActive: true,
    isSsoEnabled: true,
  },
  {
    name: "CustomerSupport",
    description: "Handle customer queries and support tickets.",
    isActive: true,
    isSsoEnabled: true,
  },
  {
    name: "Sales",
    description: "Manage sales and marketing campaigns.",
    isActive: true,
    isSsoEnabled: true,
  },
  {
    name: "Customer",
    description: "Access to browse and book tours.",
    isActive: true,
    isSsoEnabled: true,
  },
];

// seed data
const seedRoles = async () => {
  // delete existing
  await Role.deleteMany({});
  // insert new
  await Role.insertMany(roles);
};

module.exports = seedRoles;
