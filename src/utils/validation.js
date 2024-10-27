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

const validateProfileEditRequest = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photo",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};

const validatePasswordUpdateRequest = (req) => {
  const { oldPassword, newPassword } = req.body;
  if(!oldPassword || !newPassword) {
    return false;
  }
  return true;
};

module.exports = {
  validateSignupRequest,
  validateProfileEditRequest,
  validatePasswordUpdateRequest
};
