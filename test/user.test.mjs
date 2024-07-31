import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("User Endpoints", () => {
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
  });

  // test POST /users endpoint
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/users").send({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", "customerUser");
      expect(res.body).to.have.property("email", "customeruser@example.com");
    });

    it("should not create a user with an existing username", async () => {
      await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app).post("/users").send({
        username: "customerUser",
        email: "changedemail@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });

    it("should not create a user with an existing email", async () => {
      await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app).post("/users").send({
        username: "changedUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /users endpoint
  describe("GET /users", () => {
    it("should fetch all users", async () => {
      await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();
      await new User({
        username: "adminUser",
        email: "adminuser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app).get("/users");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /users/:id endpoint
  describe("GET /users/:id", () => {
    it("should fetch a user by ID", async () => {
      const user = await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app).get(`/users/${user._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("username", "customerUser");
      expect(res.body).to.have.property("email", "customeruser@example.com");
    });

    it("should return 404 if user not found", async () => {
      const nonExistentUserId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/users/${nonExistentUserId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "User not found.");
    });
  });

  // test PATCH /users/:id endpoint
  describe("PATCH /users/:id", () => {
    it("should update a user", async () => {
      const user = await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app)
        .patch(`/users/${user._id}`)
        .send({ email: "upatedcustomeemail@example.com" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "email",
        "upatedcustomeemail@example.com"
      );
    });

    it("should return 404 if user not found", async () => {
      const nonExistentUserId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/users/${nonExistentUserId}`)
        .send({ email: "upatedcustomeemail@example.com" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "User not found.");
    });
  });

  // test DELETE /users/:id endpoint
  describe("DELETE /users/:id", () => {
    it("should delete a user", async () => {
      const user = await new User({
        username: "customerUser",
        email: "customeruser@example.com",
        password: "securepassword",
        role: new mongoose.Types.ObjectId(),
      }).save();

      const res = await request(app).delete(`/users/${user._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "User deleted successfully."
      );

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).to.be.null;
    });

    it("should return 404 if user not found", async () => {
      const nonExistentUserId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/users/${nonExistentUserId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "User not found.");
    });
  });
});
