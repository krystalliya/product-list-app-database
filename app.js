//jshint esversion:6
const cors = require("cors");
const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
});

const productSchema = new mongoose.Schema({
    name: String,
    costInRMB: Number,
    usualPrice: Number,
    description: String,
});

const Product = mongoose.model("Product", productSchema);

const product1 = new Product({
    name: "Fishtail Mix 200pc",
    costInRMB: 6.5,
    usualPrice: 5.99,
    description:
        "The purpose of lorem ipsum is to create a natural looking block of text.",
});

const product2 = new Product({
    name: "A-Fairy Mix 200pc",
    costInRMB: 5.5,
    usualPrice: 5.5,
    description:
        "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
});

const product3 = new Product({
    name: "Lower Lash 120pc",
    costInRMB: 3.5,
    usualPrice: 4.5,
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
});

const defaultProducts = [product1, product2, product3];

app.post("/test", function (req, res) {
    Product.find({}, function (err, foundProducts) {
        if (foundProducts.length === 0) {
            Product.insertMany(defaultProducts, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default products to DB.");
                }
            });
            res.send("ok");
        } else {
            res.send("ok");
        }
    });
});

//load product in main page
app.get("/products", async function (req, res) {
    try {
        const products = await Product.find({});

        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed");
    }
});

//add the new product to the database
app.post("/product", async function (req, res) {
    try {
        const { name, costInRMB, usualPrice, description } = req.body;

        const product = new Product({
            name: name,
            costInRMB: costInRMB,
            usualPrice: usualPrice,
            description: description,
        });

        await product.save();

        res.status(200).send("Saved new product to DB.");
    } catch (err) {
        console.log(err);

        res.status(500).send("Failed");
    }
});

//delete product
app.post("/deleteproduct", async function (req, res) {
    try {
        const { id } = req.body;
        await Product.findByIdAndRemove(id);
        res.status(200).send("Deleted product from DB.");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed");
    }
});

//update product
app.put("/product", async function (req, res) {
    try {
        const updatedProduct = req.body;

        const requestId = req.body._id;

        await Product.findByIdAndUpdate({ _id: requestId }, updatedProduct);

        res.status(200).send("Updated product to DB.");
    } catch (err) {
        console.log(err);

        res.status(500).send("Failed");
    }
});

app.listen(process.env.PORT || 8000, function () {
    console.log("Server started on port 8000");
});
