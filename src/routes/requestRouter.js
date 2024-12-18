const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");
const authRouter = require("./authRouter");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Check if the status is valid
      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status : " + status });
      }

      // Check if connection request is send to invalid userId
      const toUser = await UserModel.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Check if the user is trying to send request to himself
      if (fromUserId.toString() === toUserId) {
        return res
          .status(400)
          .json({ message: "You cannot send request to yourself!" });
      }

      // Check if the user has already sent connection request
      const existingRequest = await connectionRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({ message: "Request already sent!" });
      }

      // Create new connection request
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({
        message:
          status === "interested"
            ? "Connection request sent successfully!"
            : "Connection request ignored!",
        data,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      
      // validate if ststus is right [] STATUS : accepted, rejected
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status : " + status });
      }

      // requestId should be valid that exists in database
      // toUserId should be loggedInuserId
      // status should be interested before accepting and rejecting it
      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).json({ message: "Connection request not found!" });
      }

      // update the status of the connection request
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "connection request " + status, data });

    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

module.exports = requestRouter;
