//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
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

app.post("/test", async function (req, res) {
    //   get the default product list from database
    //   Product.find({}, function (err, foundProducts) {
    //     if (foundProducts.length === 0) {
    //       Product.insertMany(defaultProducts, function (err) {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("Successfully saved default products to DB.");
    //         }
    //       });

    // Promise
    //    Product.insertMany(defaultProducts).then( () => {
    //     console.log("ok");
    //    }).catch( (err) => {
    //     console.log(err);
    //    })

    // async / await
    try {
        foundProducts = await Product.find({});
        if (foundProducts.length === 0) {
            await Product.insertMany(defaultProducts);
        }
        console.log("success");
    } catch (err) {
        console.log(err);
        res.send("failed");
    }

    //   res.send("ok");
    // } else {
    //   res.send("ok");
    // }
    //   });
});

app.post("/product", function (req, res) {
    //add the new product to the database
    const { name, key, costInRMB, usualPrice, description } = req.body;

    const product = new Product({
        key: key,
        name: name,
        costInRMB: costInRMB,
        usualPrice: usualPrice,
        description: description,
    });

    product.save();
    res.send("Saved new product to DB.");
});

app.delete("/product", function (req, res) {});

app.put("/product", function (req, res) {});

app.get("/view", function (req, res) {
    //get product data when press view button
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
