const Router = require('express').Router();
const homeController = require('../Controllers/homeController');
const session = require('express-session');
const userController = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/auth');

console.log("reached here at index");

Router.get('/', homeController.home);
Router.use('/students', require('./students'));
Router.get('/me',authMiddleware.isAuthenticated,userController.checkAuth);
Router.post('/login', userController.login);
Router.post('/users/update-profile', authMiddleware.isAuthenticated, userController.updateProfile);


module.exports = Router;