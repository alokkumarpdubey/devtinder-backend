const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a valid status!",
      },
      default: "ignored",
      required: true,
    },
  },
  { timestamps: true }
);

// Create unique index for fromUserId and toUserId
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

// Check if fromUserId and toUserId are same
connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
    throw new Error("fromUserId and toUserId are same!");
  }
//   next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
