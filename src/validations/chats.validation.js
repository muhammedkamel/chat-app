const Joi = require('joi');

const createChatValidation = Joi.object({
    token: Joi.string().required(),
});

module.exports = {
    createChatValidation,
}