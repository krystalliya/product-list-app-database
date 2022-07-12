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

const product1 = new Product({
  key: 1,
  name: "Fishtail Mix 200pc",
  costInRMB: 6.5,
  usualPrice: 5.99,
  description:
    "The purpose of lorem ipsum is to create a natural looking block of text.",
});

const product2 = new Product({
  key: 2,
  name: "A-Fairy Mix 200pc",
  costInRMB: 5.5,
  usualPrice: 5.5,
  description:
    "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
});

const product3 = new Product({
  key: 3,
  name: "Lower Lash 120pc",
  costInRMB: 3.5,
  usualPrice: 4.5,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
});

const defaultProducts = [product1, product2, product3];

// defaultProducts.save();

app.post("/test", function (req, res) {
  res.send("done!");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
