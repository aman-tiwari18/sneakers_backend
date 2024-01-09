const mongoose = require("mongoose");
const { type } = require("os");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: [String],
        required: true,
    },
    oldPrice: {
        type: String,
        required: true,
    },
    sizes: {
        type: [
            {
                size: {
                    type: String,
                    requred: true,
                },
                isSelcted: {
                    type: Boolean,
                    required: false,
                    default: false,
                },
            },
        ]
    },

    price: {
        type: String,
        required: true,
    },
    desription: {
        type: String,
        required: true,
    }


}, { timestamps: true });


module.exports = mongoose.model("Product", ProductSchema);