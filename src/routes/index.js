const express = require('express');
const router = express.Router();
const appsRouter = require('./apps.route');
const chatsRouter = require('./chats.route');

router.use('/apps', appsRouter);
router.use('/apps/:token/chats', chatsRouter);

module.exports = router;
