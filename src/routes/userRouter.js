const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

// Get all pending connection requests received by logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName age gender about photo skills");

        if (!connectionRequests) {
            return res.status(400).json({ message: "No connection requests found!" });
        }

        res.json({ message: "Connection requests fetched successfully!", data: connectionRequests });

    }catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get all connections of logged in user
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionRequestModel.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
            $and: [{ status: "accepted" }]
        }).populate("fromUserId toUserId", "firstName lastName age gender about photo skills");

        if (!connections) {
            return res.status(400).json({ message: "No connections found!" });
        }
        const data = connections.map((connection) => {
            if (connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
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
})

module.exports = userRouter;
