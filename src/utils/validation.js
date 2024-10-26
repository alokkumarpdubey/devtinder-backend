const validator = require("validator");

const validateSignupRequest = (req) => {
  const { firstName, lastName, email, password, age, gender } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name is required!");
  } else if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email!");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Invalid password!");
  }
};

module.exports = {
  validateSignupRequest,
};
