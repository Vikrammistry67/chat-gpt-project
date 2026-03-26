const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/auth.controller');
const Router = express.Router();

Router.post('/registerUser', registerUser);
Router.post('/loginUser', loginUser)
Router.post('/logoutUser', logoutUser);


module.exports = Router;
