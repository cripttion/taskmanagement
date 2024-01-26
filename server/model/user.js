const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Task: [
    {
      Title: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
      DueData: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("TaskUser", userSchema);
