const User = require("./../models/user.model");
const Role = require("./../models/role.model");
const bcrypt = require("bcryptjs");

// sample data
const users = async (roles) => [
  {
    username: "adminUser",
    email: "admin@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "Admin")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
  {
    username: "managerUser",
    email: "manager@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "Manager")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
  {
    username: "tourGuideUser",
    email: "tourguide@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "TourGuide")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
  {
    username: "customerSupportUser",
    email: "support@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "CustomerSupport")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
  {
    username: "salesUser",
    email: "sales@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "Sales")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
  {
    username: "customerUser",
    email: "customer@example.com",
    password: await bcrypt.hash("hashedpassword123", 10),
    role: roles.find((role) => role.name === "Customer")._id,
    ssoProvider: "",
    ssoId: "",
    isActive: true,
  },
];

// seed data
const seedUsers = async () => {
  // delete existing
  await User.deleteMany({});

  // get roles
  const roles = await Role.find();

  // build data with references
  const userWithReferences = await users(roles);

  // insert new
  await User.insertMany(userWithReferences);
};

module.exports = seedUsers;
