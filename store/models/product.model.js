const mogoose = require('mongoose');


const categorySchema = new mogoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }, details: {
        type: String,
        required: false
    }, createAt: {
        type: Date,
        default: Date.now
    }, updateAt: {
        type: Date,
        default: Date.now
    }
})

const producerSchema = new mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }

})

const productSchema = new mogoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: [
        {
            type: mogoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    producer: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'Producer'
    },
    quantity: {
        type: Number,
        required: true
    },
    describe: {
        type: String,
        required: false
    },
    evaluate: {
        type: String,
        required: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }

})


const Category = mogoose.model('Category', categorySchema);
const Product = mogoose.model('Product', productSchema);
const Producer = mogoose.model('Producer', producerSchema);
module.exports = {
    Category,
    Product,
    Producer
}