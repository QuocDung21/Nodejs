const Router = require('express').Router();
const productController = require('../controllers/productController');

Router.post('/create', productController.createProducts)
Router.get('/', productController.getProducts)


module.exports = Router;
