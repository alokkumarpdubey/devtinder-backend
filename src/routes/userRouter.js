const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const userModel = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_FIELDS = "firstName lastName age gender about photo skills";

// Get all pending connection requests received by logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate(
        "fromUserId",
        "firstName lastName age gender about photo skills"
      );

    if (!connectionRequests) {
      return res.status(400).json({ message: "No connection requests found!" });
    }

    res.json({
      message: "Connection requests fetched successfully!",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all connections of logged in user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
        $and: [{ status: "accepted" }],
      })
      .populate("fromUserId toUserId", USER_SAFE_FIELDS);

    if (!connections) {
      return res.status(400).json({ message: "No connections found!" });
    }
    const data = connections.map((connection) => {
      if (
        connection.fromUserId._id.toString() === loggedInUser._id.toString()
      ) {
        return connection.toUserId;
      } else {
        return connection.fromUserId;
      }
    });
    // res.json({ message: "Connections fetched successfully!", data: connectionsData });
    res.json({ message: "Connections fetched successfully!", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users card except logged in user, his connections, ignored users, already sent the connection request
userRouter.get("/user/feed/", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    limit = limit > 50 ? 50 : limit;

    const connectionRequest = await connectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideUsers = new Set();
    connectionRequest.forEach((connection) => {
      hideUsers.add(connection.toUserId._id.toString());
      hideUsers.add(connection.fromUserId._id.toString());
    });

    const users = await userModel
      .find({
        $and: [
          { _id: { $nin: [...hideUsers] } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
      .select(USER_SAFE_FIELDS)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ message: "Users fetched successfully!", data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = userRouter;
