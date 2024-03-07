const express = require('express');
const ExpressJoiValidation = require('express-joi-validation');
const { createMessageValidation, chatMessageValidation, updateMessageValidation } = require('../validations/messages.validation');
const { createMessage, getMessages, updateMessage } = require('../services/messages.service');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/', validator.params(chatMessageValidation), getMessages);
router.post('/', validator.params(chatMessageValidation), validator.body(createMessageValidation), createMessage);
router.put('/:messageNumber', validator.params(updateMessageValidation), validator.body(createMessageValidation), updateMessage);

module.exports = router;
