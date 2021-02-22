const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);