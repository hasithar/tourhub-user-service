const mongoose = require("mongoose");
require("dotenv").config();

const roleSeeder = require("./role.seeder");
const userSeeder = require("./user.seeder");
const profileSeeder = require("./profile.seeder");

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.dbTesting
    : process.env.NODE_ENV === "production"
    ? process.env.dbProduction
    : process.env.dbDevelopment;

mongoose
  .connect(
    `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`
  )
  .then(() => {
    console.log("Connected to the databse");
    runSeeders();
  })
  .catch(() => console.log("Error connecting to the database"));

// run seeders
const runSeeders = async () => {
  try {
    // run role seeder
    await roleSeeder();
    console.log("roles seeded successfully");

    // run user seeder
    await userSeeder();
    console.log("users seeded successfully");

    // run profile seeder
    await profileSeeder();
    console.log("profiles seeded successfully");

    // close db connection
    mongoose.connection.close();
    console.log("DB seeding completed and connection closed");
  } catch (error) {
    console.error("Error during seeding:", error);
    ls;

    mongoose.connection.close();
  }
};
