const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load .env file from the project root
dotenv.config({ path: path.join(__dirname, "./../../../.env") });

// Load .env file from service root
// dotenv.config();

const roleSeeder = require("./role.seeder");
const userSeeder = require("./user.seeder");
const profileSeeder = require("./profile.seeder");

// db connection
const dbName =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TESTING
    : process.env.NODE_ENV === "production"
    ? process.env.DB_PRODUCTION
    : process.env.DB_DEVELOPMENT;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_CONNECTION_STRING}/${dbName}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`
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
