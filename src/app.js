const express = require("express");
const app = express();

// routing handlers

// this will match all the HTTP methoda api calls
app.use("/test", (req, res) => {
  res.send("Test from the server.");
});

// this will match only GET requests to user
app.get("/user", (req, res) => {
  res.send({ name: "Alok", age: 30 });
});

app.post("/user", (req, res) => {
  res.send("Creating a new user");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
