const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent connection request!!");
});

module.exports = requestRouter;