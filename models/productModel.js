const { model, Schema } = require("mongoose");

const productSchema = new Schema({
    createdAt: { type: Date, require },
    updatedAt: { type: Date, require },
    name: { type: String, require },
    price: { type: Number, require },
    description: String,
    image: String, //* Link to cloudinary
    tags: { type: [String], enum: ["tag1", "tag2", "tag3"] },
});

module.exports = model("products", productSchema);
