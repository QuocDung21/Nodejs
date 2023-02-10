const Router = require('express').Router();
const producerController = require('../controllers/producerController');

Router.post('/create', producerController.createProducer)


module.exports = Router;
