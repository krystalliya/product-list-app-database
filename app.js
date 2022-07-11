//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/productsDB", {
  useNewUrlParser: true,
});

const productSchema = new mongoose.Schema({
  key: Number,
  name: String,
  costInRMB: Number,
  usualPrice: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

const product = new Product({
  key: 1,
  name: "Fishtail Mix 200pc",
  costInRMB: 6.5,
  usualPrice: 5.99,
  description:
    "The purpose of lorem ipsum is to create a natural looking block of text.",
});

// product.save();

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
