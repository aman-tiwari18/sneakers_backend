const Product = require("../models/Product");


module.exports = {
    createProduct: async (req, res) => {
        
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json({ message: "Product created", product: newProduct });
        } catch (error) {
            console.log(error)
            res.status(500).json("Error in creating product");
        }
    },


    getAllProduct: async (req, res) => {
        try {
            console.log({Product})
            const products = await Product.find();
            console.log({products})
            res.status(200).json({products});
            
        } catch (error) {
            res.status(500).json("Error in getting all products")
        }
    },


    getProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            const { __v, createdAt, ...productData } = product._doc;
            res.status(200).json(productData);
            

        } catch (error) {
            res.status(500).json("failed to get the product")
        }
    },



    searchProducts: async (req, res) => {
        try {
            const results = await Product.aggregate(
                [
                    {
                        $search: {
                        index: "shoes",
                        text: {
                            query: req.params.key,
                            path: {
                            wildcard: "*"
                            }
                        }
                        }
                    }
]
            )
        } catch (error) {
            res.status(500).json("Error in searching");
        }
    }
}