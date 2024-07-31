import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose, { mongo } from "mongoose";
import Profile from "../models/profile.model.js";
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
  });

  // test POST /profiles endpoint
  describe("POST /profiles", () => {
    it("should create a new profile", async () => {
      const res = await request(app)
        .post("/profiles")
        .send({
          userId: new mongoose.Types.ObjectId(),
          name: {
            firstName: "John",
            lastName: "Doe",
          },
          contactDetails: {
            email: "johndoe@example.com",
            phone: "1234567890",
          },
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("userId");
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("contactDetails");
      expect(res.body.name).to.have.property("firstName", "John");
      expect(res.body.name).to.have.property("lastName", "Doe");
      expect(res.body.contactDetails).to.have.property(
        "email",
        "johndoe@example.com"
      );
    });

    it("should not create a profile with an existing user id", async () => {
      await new Profile({
        userId: "66790231589012d045437257",
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();

      const res = await request(app)
        .post("/profiles")
        .send({
          userId: "66790231589012d045437257",
          name: {
            firstName: "John",
            lastName: "Doe",
          },
          contactDetails: {
            email: "johndoechanged@example.com",
            phone: "0987654321",
          },
        });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });

    it("should not create a profile with an existing email", async () => {
      await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();

      const res = await request(app)
        .post("/profiles")
        .send({
          userId: new mongoose.Types.ObjectId(),
          name: {
            firstName: "John",
            lastname: "Doe",
          },
          contactDetails: {
            email: "johndoe@example.com",
            phone: "0123456789",
          },
        });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message");
    });
  });

  // test GET /profiles endpoint
  describe("GET /profiles", () => {
    it("should fetch all profiles", async () => {
      await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();
      await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "Jane",
          lastName: "Doe",
        },
        contactDetails: {
          email: "janedoe@example.com",
          phone: "0123456789",
        },
      }).save();

      const res = await request(app).get("/profiles");

      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  // test GET /profiles/:id endpoint
  describe("GET /profiles/:id", () => {
    it("should fetch a profile by ID", async () => {
      const profile = await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();

      const res = await request(app).get(`/profiles/${profile._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("userId");
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("contactDetails");
      expect(res.body.name).to.have.property("firstName", "John");
      expect(res.body.name).to.have.property("lastName", "Doe");
      expect(res.body.contactDetails).to.have.property(
        "email",
        "johndoe@example.com"
      );
    });

    it("should return 404 if profile not found", async () => {
      const nonExistentProfileId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/profiles/${nonExistentProfileId}`);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Profile not found.");
    });
  });

  // test PATCH /profiles/:id endpoint
  describe("PATCH /profiles/:id", () => {
    it("should update a profile", async () => {
      const profile = await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();

      const res = await request(app)
        .patch(`/profiles/${profile._id}`)
        .send({ contactDetails: { email: "upatedcustomeemail@example.com" } });

      expect(res.status).to.equal(200);
      expect(res.body.contactDetails).to.have.property(
        "email",
        "upatedcustomeemail@example.com"
      );
    });

    it("should return 404 if profile not found", async () => {
      const nonExistentProfileId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .patch(`/profiles/${nonExistentProfileId}`)
        .send({ email: "upatedcustomeemail@example.com" });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Profile not found.");
    });
  });

  // test DELETE /profiles/:id endpoint
  describe("DELETE /profiles/:id", () => {
    it("should delete a profile", async () => {
      const profile = await new Profile({
        userId: new mongoose.Types.ObjectId(),
        name: {
          firstName: "John",
          lastName: "Doe",
        },
        contactDetails: {
          email: "johndoe@example.com",
          phone: "1234567890",
        },
      }).save();

      const res = await request(app).delete(`/profiles/${profile._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        "message",
        "Profile deleted successfully."
      );

      const deletedProfile = await Profile.findById(profile._id);
      expect(deletedProfile).to.be.null;
    });

    it("should return 404 if profile not found", async () => {
      const nonExistentProfileId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(
        `/profiles/${nonExistentProfileId}`
      );

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message", "Profile not found.");
    });
  });
});
