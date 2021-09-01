const router = require("express").Router();
const productDatabase = require("../models/productModel");

//* GET ALL PRODUCTS
router.get("/", (req, res) => {
    productDatabase.find({}, (err, products) => {
        if (err) res.status(400).json({ error: err })
        else res.status(200).json(products)
    })
})

//* CREATE NEW PRODUCTS
router.post("/", (req, res) => {
    //* VALIDATE DATA
    if (typeof req.body.name !== "string") return res.status(400).json({ error: "Name is not valid (NOT A STRING)" })
    if (/[a-z]/ig.test(req.body.price)) return res.status(400).json({ error: "Price is not valid (NOT A NUMBER)" })
    if (req.body.description && typeof req.body.description !== "string") return res.status(400).json({ error: "Description is not valid (NOT A STRING)" })

    //* PACKAGE DATA
    const data = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        tags: req.body.tags
    }

    //* SEND DATA TO DB
    productDatabase.create({ ...data }, (err, createdProduct) => {
        if (err) res.status(400).json({ error: err });
        else res.status(201).json(createdProduct);
    });
});

//* GET PRODUCT BY ID
router.get("/:id", (req, res) => {
    const id = req.params.id
    productDatabase.findById(id, (err, product) => {
        if (err) res.status(400).json({ error: err });
        else res.status(200).json(product);
    });
});

//* UPDATE PRODUCT BY ID
router.post("/:id", (req, res) => {
    const id = req.params.id
    const data = { updatedAt: Date.now(), ...req.body.data }

    productDatabase.findByIdAndUpdate(id, { ...data }, (err, product) => {
        if (err) res.status(400).json({ error: err });
        else res.status(200).json(product);
    });
});

//* DELETE PRODUCT BY ID
router.delete("/:id", (req, res) => {
    const id = req.params.id

    productDatabase.findByIdAndDelete(id, (err, deletedUser) => {
        if (err) res.status(400).json({ error: err });
        else res.status(200).json({ id: deletedUser._id });
    });
});


module.exports = router;