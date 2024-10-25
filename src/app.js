const express = require("express");
const app = express();


app.get("/user", (req, res, next) => {
  try {
    throw new Error("user not found");
    res.send("user api response");
  } catch (err) {
    res.status(500).send("Something went wrong! Please try again later.");
  }
  
})

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal server error");
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
