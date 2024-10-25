const express = require("express");
const connectDB = require("./config/database");

const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("No user found with email " + userEmail);
    }
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userID);
    // const user = await User.findByIdAndDelete({_id : userID});
    if (!user) {
      res.send("user not found by id " + userID);
    }
    res.send("user deleted successfully");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const userUpdate = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, userUpdate, {new: true});
    if(!user) {
      res.status(404).send("user not found by id " + userId);
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
})

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });
