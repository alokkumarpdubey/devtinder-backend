const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://alokkumarpdubey:A5Hgq7dvMBOINpf4@learningnode.lk5pa.mongodb.net/devtinder");
}

module.exports = connectDB;