const {
    Category,
    Product,
    Producer
} = require('../models/product.model');

const productController = {

    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    createProducts: async (req, res) => {
        try {
            const newProduct = new Product(req.body)
            const saveProduct = await newProduct.save();
            return await res.status(200).json(saveProduct);
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    updateProduct: async () => {
        try {
            const newProduct = new Product(req.body)
            
        } catch (error) {

        }
    }

}

module.exports = productController;