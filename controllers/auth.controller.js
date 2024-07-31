const passport = require("./../passportConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/user.model");
const Role = require("./../models/role.model");

// regiter user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // get id for default role "customer"
    const customerRole = await Role.findOne({
      name: { $regex: /^customer$/i },
    });
    if (!customerRole) {
      return res.status(500).json({ message: "Customer role not found" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: customerRole._id,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user login
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  })(req, res, next);
};

// const googleCallback = (req, res) => {
//   const token = jwt.sign(
//     { userId: req.user._id, role: req.user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );
//   res.redirect(`/?token=${token}`);
// };

// module.exports = { register, login, googleCallback };

module.exports = { register, login };
