const express = require("express");
const app = express();

// routing handlers
app.get("/user/:userId", (req, res, next) => {
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  res.send({ name: "Alok", age: 30 });
});

app.get("/profile", (req, res, next) => {
  next();
  console.log("profile 1");
}, (req, res, next) => {
  next();
  console.log("profile 2");
}, (req, res, next) => {
  next();
  console.log("profile 3");
}, (req, res, next) => {
  console.log("profile 4");
  res.send("profile 4");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
