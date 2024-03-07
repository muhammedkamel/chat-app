const Joi = require('joi');

const createMessageValidation = Joi.object({
    content: Joi.string().required(),
});

const chatMessageValidation = Joi.object({
    token: Joi.string().required(),
    number: Joi.number().required(),
});

const updateMessageValidation = Joi.object({
    token: Joi.string().required(),
    number: Joi.number().required(),
    messageNumber: Joi.number().required(),
});

module.exports = {
    createMessageValidation,
    chatMessageValidation,
    updateMessageValidation
}