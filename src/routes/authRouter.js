const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { validateSignupRequest } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate the request body
    validateSignupRequest(req);

    // hash the password
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photo,
      about,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      photo,
      about,
      skills,
    });
    await user.save(); // save the user to the database
    res.send(user); // send the response
  } catch (error) {
    res.status(500).send(error.message);
    console.log("Error in signup request", error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    var token = await user.getJWTToken();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
    res.send("Login successful");
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in login request", error.message);
  }
});

authRouter.get("/logout", async (req, res) => {
  // res.clearCookie("token");
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful");
});

module.exports = authRouter;
