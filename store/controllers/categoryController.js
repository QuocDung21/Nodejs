const {
    Category,
    Product,
    Producer
} = require('../models/product.model');

const categoryController = {

    createCategory: (req, res) => {
        try {
            const newCategory = new Category(req.body)
            const saveCategory = newCategory.save();
            return res.status(200).json(saveCategory);
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

}

module.exports = categoryController;