const Router = require('express').Router();
const homeController = require('../Controllers/homeController');
const session = require('express-session');

console.log("reached here at index");

Router.get('/', homeController.home);
Router.use('/students', require('./students'));


module.exports = Router;