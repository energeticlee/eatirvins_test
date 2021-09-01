const express = require("express")
const path = require("path");
const cors = require("cors");
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARE
app.use(cors());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "client")));

//* REQUIRE CONTROLLER | EXPRESS ROUTING
const products = require("./controllers/products");

//* ROUTES
app.use("/api/products", products);

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "irvins_challenge/public", "index.html"));
// });

module.exports = app