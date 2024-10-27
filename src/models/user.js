const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "devTINDER_SECRET";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: { type: String, trim: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: { type: Number, min: 18, max: 60 },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not a valid gender!",
      },
      // validator: (v) => v === "Male" || v === "Female",
      //   message: "Gender must be either Male or Female",
      // },
    },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    about: { type: String, default: "Hey! I am using Dev Tinder" },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.getJWTToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordGivenByUser) {
  const user = this;
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(
    passwordGivenByUser,
    hashedPassword
  );
  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
