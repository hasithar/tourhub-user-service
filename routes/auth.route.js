const express = require("express");
const router = express.Router();
const passport = require("./../passportConfig");
const authController = require("./../controllers/auth.controller");

// local registration
router.post("/register", authController.register);

// local login
router.post("/login", authController.login);

// // Google OAuth
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   authController.googleCallback
// );

module.exports = router;
