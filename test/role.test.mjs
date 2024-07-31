import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import Role from "../models/role.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./testHelper.mjs";

describe("Role Endpoints", () => {
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

  // test POST /roles endpoint
  describe("POST /roles", () => {
    it("should create a new role", async () => {
      const res = await request(app).post("/roles").send({
        name: "Manager",
        description: "A managerial role",
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Manager");
      expect(res.body).to.have.property("description", "A managerial role");
    });

    it("should not create a role with an existing name", async () => {
      await new Role({
        name: "Manager",
        description: "A managerial role",
      }).save();

      const res = await request(app).post("/roles").send({
        name: "Manager",
        description: "A different managerial role",
      });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /roles endpoint
  describe("GET /roles", () => {
    it("should fetch all roles", async () => {
      await new Role({
        name: "Manager",
        description: "A managerial role",
      }).save();
      await new Role({
        name: "Employee",
        description: "A regular employee role",
      }).save();

      const res = await request(app).get("/roles");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /roles/:id endpoint
  describe("GET /roles/:id", () => {
    it("should fetch a role by ID", async () => {
      const role = await new Role({
        name: "Manager",
        description: "A managerial role",
      }).save();

      const res = await request(app).get(`/roles/${role._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("name", "Manager");
      expect(res.body).to.have.property("description", "A managerial role");
    });

    it("should return 404 if role not found", async () => {
      const nonExistentRoleId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/roles/${nonExistentRoleId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Role not found.");
    });
  });

  // test PATCH /roles/:id endpoint
  describe("PATCH /roles/:id", () => {
    it("should update a role", async () => {
      const role = await new Role({
        name: "Manager",
        description: "A managerial role",
      }).save();

      const res = await request(app)
        .patch(`/roles/${role._id}`)
        .send({ description: "An updated managerial role" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "description",
        "An updated managerial role"
      );
    });

    it("should return 404 if role not found", async () => {
      const nonExistentRoleId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/roles/${nonExistentRoleId}`)
        .send({ description: "An updated managerial role" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Role not found.");
    });
  });

  // test DELETE /roles/:id endpoint
  describe("DELETE /roles/:id", () => {
    it("should delete a role", async () => {
      const role = await new Role({
        name: "Manager",
        description: "A managerial role",
      }).save();

      const res = await request(app).delete(`/roles/${role._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Role deleted successfully."
      );

      const deletedRole = await Role.findById(role._id);
      expect(deletedRole).to.be.null;
    });

    it("should return 404 if role not found", async () => {
      const nonExistentRoleId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/roles/${nonExistentRoleId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Role not found.");
    });
  });
});
