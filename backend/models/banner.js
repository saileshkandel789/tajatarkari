const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Banner = mongoose.model("Banner", BannerSchema);
