const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "devTINDER_SECRET";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      // throw new Error("Unauthorized access!!");
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      // throw new Error("Unauthorized access!!");
      return res.status(401).send("Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { userAuth };
