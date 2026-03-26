const express = require('express');
const { authUser } = require('../middlewares/auth.middleware');
const { createChat, getChats, getMessages } = require('../controllers/chat.controller');

const Router = express.Router();


Router.post('/', authUser, createChat);
Router.get('/', authUser, getChats)
Router.get('/messages/:id', authUser, getMessages)

module.exports = Router;