//jshint esversion:6

const mongoose = require("mongoose");

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

product.save();
