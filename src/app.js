const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
// why middleware?
// 1. authentication
// 2. logging
// 3. validation
// 4. formatting the data

app.use("/admin", adminAuth)

app.get("/admin/getdata", (req, res, next) => {
  res.send("all data");
})

app.get("/admin/delete", (req, res, next) => {
  res.send("delete data");
})

app.get("/user", userAuth, (req, res, next) => {
  res.send("user api response");
})

app.post("/user/login", (req, res, next) => {
  res.send("user login successful");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
