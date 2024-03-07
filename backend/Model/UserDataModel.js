const mongoose = require("mongoose");

const UserDataScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,

    min: 10,
  },
  hobby: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("UserData", UserDataScheme);
