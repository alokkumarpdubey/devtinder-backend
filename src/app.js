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

connectDB().then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
}).catch(err => {
    console.log("error connecting to database", err);
})

