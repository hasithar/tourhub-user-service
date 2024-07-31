import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose, { mongo } from "mongoose";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Profile Endpoints", () => {
  // runs once before all tests
  before(async () => {
    await connectTestDB();
  });

  // runs once after all tests
  after(async () => {
    await closeTestDB();
  });

  // runs before each test
  beforeEach(async () => {
    await clearTestDB();
    // C=create default "customer" role
    await new Role({ name: "Customer" }).save();
  });

  // test POST /auth/register endpoint
  describe("POST /auth/register", () => {
    it("should register a new user with the customer role", async () => {
      const res = await request(app).post("/auth/register").send({
        username: "johndoe",
        email: "john.doe@example.com",
        password: "password123",
      });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property(
        "message",
        "User registered successfully"
      );

      const user = await User.findOne({ email: "john.doe@example.com" });
      expect(user).to.not.be.null;
      expect(user).to.have.property("username", "johndoe");
      expect(user).to.have.property("email", "john.doe@example.com");

      const customerRole = await Role.findOne({
        name: { $regex: /^customer$/i },
      });
      expect(user.role.toString()).to.equal(customerRole._id.toString());
    });

    it("should return an error if the customer role is not found", async () => {
      // Delete the customer role
      await Role.deleteMany({ name: { $regex: /^customer$/i } });

      const res = await request(app).post("/auth/register").send({
        username: "johndoe",
        email: "john.doe@example.com",
        password: "password123",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message", "Customer role not found");
    });
  });

  // test POST /auth/login endpoint
  describe("POST /auth/login", () => {
    it("should login an existing user using username/password and return a JWT token", async () => {
      // register the user first
      await request(app).post("/auth/register").send({
        username: "johndoe",
        email: "john.doe@example.com",
        password: "password123",
      });

      const res = await request(app).post("/auth/login").send({
        login: "johndoe",
        password: "password123",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("should login an existing user using email/password and return a JWT token", async () => {
      // register the user first
      await request(app).post("/auth/register").send({
        username: "johndoe",
        email: "john.doe@example.com",
        password: "password123",
      });

      const res = await request(app).post("/auth/login").send({
        login: "john.doe@example.com",
        password: "password123",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("should return an error for invalid login credentials", async () => {
      // register the user first
      await request(app).post("/auth/register").send({
        username: "johndoe",
        email: "john.doe@example.com",
        password: "password123",
      });

      const res = await request(app).post("/auth/login").send({
        login: "johndoe",
        password: "wrongpassword",
      });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Incorrect password.");
    });
  });
});
