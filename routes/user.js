const middlewareController = require('../controllers/middlewareController');
const userController = require('../controllers/userController');
const Router = require('express').Router()

Router.post('/register', userController.registerUser)
Router.post('/login', userController.loginUser)
Router.get('/', middlewareController.verifyToken, userController.getAllUser)
Router.post('/refresh', userController.requestRefreshToken)
module.exports = Router