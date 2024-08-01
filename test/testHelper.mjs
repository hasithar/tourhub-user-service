import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env file from service root
// dotenv.config();

// Load .env file from the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "./../../../.env") });

export const connectTestDB = async () => {
  const dbName = process.env.DB_TESTING;
  const connectionString = `mongodb+srv://${process.env.DB_CONNECTION_STRING}/${dbName}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
  await mongoose.connect(connectionString);
};

export const closeTestDB = async () => {
  await mongoose.connection.close();
};

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
