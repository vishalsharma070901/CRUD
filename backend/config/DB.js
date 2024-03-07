const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log("MONGO Connection error");
  }
};

module.exports = connectDB;
