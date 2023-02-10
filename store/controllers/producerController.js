const {
    Category,
    Product,
    Producer
} = require('../models/product.model');

const producerController = {

    getProducts: (req, res) => {
        res.send('Producer');
    },
    createProducer: (req, res) => {
        try {
            const newProducer = new Producer(req.body)
            const saveProducer = newProducer.save();
            return res.status(200).json(saveProducer);
        } catch (error) {
            return res.status(500).json({ error })
        }
    }

}

module.exports = producerController;