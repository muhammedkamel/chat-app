const express = require('express');
const router = express.Router();
const appsRouter = require('./apps.route');
const chatsRouter = require('./chats.route');
const messagesRouter = require('./messages.route');

router.use('/apps', appsRouter);
router.use('/apps/:token/chats', chatsRouter);
router.use('/apps/:token/chats/:number/messages', messagesRouter);

module.exports = router;
