const express = require("express");
const mongoose = require("mongoose");
const uploadutils = require("./models/uploadfile");
const Product = require("./models/product");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const uploadmiddleware = uploadutils.middleware;
const imageCompressor = require("./models/compression");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/upload", uploadmiddleware, async function (req, res) {
  const fileNumbers = req.files ? req.files.length : 0;
  const inputFiles = [];
  const outputFolderPath = path.join(
    process.cwd(),
    "/public/compressedProducts/",
  );
  const outputFolderPath1 = path.join(process.cwd(), "/public/products/");
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    username: req.body.username,
    price: req.body.price,
    pictures: fileNumbers,
    pictureUrl: [],
  });
  console.log(product);

  if (req.files && req.files.length >= 1) {
    req.files.forEach(function (file) {
      product.pictureUrl.push({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
      });
      inputFiles.push(outputFolderPath1 + file.filename);
    });
  }
  imageCompressor.compressImages(inputFiles, outputFolderPath);

  await product.save().then(() => {
    console.log("Product saved");
  });
  console.log(product.pictures);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
