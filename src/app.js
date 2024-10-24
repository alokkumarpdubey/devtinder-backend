const express = require("express");
const app = express();

// routing handlers

// "/user"
// "/us?er"
// "/us+er"
// "/us*er"
// "/u(se)?r"

app.get("/user/:userId", (req, res) => {
  console.log("req.query", req.query);
  console.log("req.params", req.params);
  res.send({ name: "Alok", age: 30 });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
