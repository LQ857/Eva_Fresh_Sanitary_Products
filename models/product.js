const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    set: (v) => Math.round(v * 100) / 100,
    required: true,
  },
  pictures: {
    type: Number,
  },
  pictureUrl: [
    {
      filename: String,
      originalname: String,
      path: String,
      size: Number,
    },
  ],
  username: {
    type: String,
    required: true,
  },
  postingtime: {
    type: Date,
    default: Date.now,
    get(value) {
      const offset = 8; // UTC +8
      const utc = value.getTime() + value.getTimezoneOffset() * 60000; // 转为 UTC 时间
      const date = new Date(utc + 3600000 * offset); // 根据偏移量调整时间
      return date.toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
    immutable: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
