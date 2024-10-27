const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const { validateProfileEditRequest, validatePasswordUpdateRequest } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send({ data: user });
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in profile request", error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateProfileEditRequest(req)) {
      throw new Error("Invalid edit request!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });
    await loggedInUser.save();
    res.send({ message: "Profile updated successfully", data: loggedInUser });
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in profile edit request", error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {    
    if(!validatePasswordUpdateRequest(req)) {
      throw new Error("Old and new password are required!");
    }
    const loggedInUser = req.user;
    const isPasswordMatch = await loggedInUser.validatePassword(req.body.oldPassword);
    if(!isPasswordMatch) {
      throw new Error("Invalid old password!");
    } else {
      const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
      loggedInUser.password = passwordHash;
      await loggedInUser.save();
      res.send({ message: "Password updated successfully" });
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in profile password update request", error.message);
  }
});

module.exports = profileRouter;
