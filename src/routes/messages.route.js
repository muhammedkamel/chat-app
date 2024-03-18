const express = require('express');
const ExpressJoiValidation = require('express-joi-validation');
const { createMessageValidation, chatMessageValidation, updateMessageValidation, searchMessagesValidation } = require('../validations/messages.validation');
const { createMessage, getMessages, updateMessage } = require('../services/messages.service');
const { search } = require('../services/search.service');

const router = express.Router({ mergeParams: true });
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/', validator.params(chatMessageValidation), getMessages);
router.post('/', validator.params(chatMessageValidation), validator.body(createMessageValidation), createMessage);
router.put('/:messageNumber', validator.params(updateMessageValidation), validator.body(createMessageValidation), updateMessage);

router.get('/search', validator.query(searchMessagesValidation), search);

module.exports = router;
