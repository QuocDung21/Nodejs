const Router = require('express').Router();
const categoryController = require('../controllers/categoryController');

Router.post('/create', categoryController.createCategory)


module.exports = Router;
