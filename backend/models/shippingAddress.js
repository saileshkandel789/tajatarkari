const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingAddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    City: {
        type: String,
      },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },  
  },
  { timestamps: true }
);

module.exports = ShippingAddress = mongoose.model("ShippingAddress", ShippingAddressSchema);