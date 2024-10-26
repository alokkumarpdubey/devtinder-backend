const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");

const app = express();
const User = require("./models/user");

const { validateSignupRequest } = require("./utils/validation");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!user) {
      throw new Error("Invalid email or password");
    }
    console.log(user.password)
    const isPassordMatch = await bcrypt.compare(password, user.password);
    if (!isPassordMatch) {
      throw new Error("Invalid email or password");
    }
    res.send("Login successful");
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in login request", error.message);
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
    res.status(500).send(error.message);
    console.log("Error in get user request", error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
    console.log("Error in get feed request", error.message);
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
    res.status(500).send(error.message);
    console.log("Error in delete user request", error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const userUpdate = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(userUpdate).every((update) =>
      ALLOWED_UPDATES.includes(update)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates");
    }
    if (userUpdate.skills.length > 10) {
      throw new Error("Skills array cannot have more than 10 skills");
    }
    const user = await User.findByIdAndUpdate(userId, userUpdate, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("user not found by id " + userId);
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
    console.log("Error in patch request", error.message);
  }
});

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
