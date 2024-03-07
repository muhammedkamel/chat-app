const express = require('express');
const { createChat, getChats } = require('../services/chats.service');
const ExpressJoiValidation = require('express-joi-validation');
const { createChatValidation } = require('../validations/chats.validation');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/', validator.params(createChatValidation), getChats);
router.post('/', validator.params(createChatValidation), createChat);

module.exports = router;
