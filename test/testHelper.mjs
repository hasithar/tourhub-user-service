import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectTestDB = async () => {
  const dbName = process.env.dbTesting;
  const connectionString = `mongodb+srv://${process.env.connectionString}/${dbName}?retryWrites=true&w=majority&appName=${process.env.appName}`;
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
