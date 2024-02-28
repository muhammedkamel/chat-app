const Joi = require('joi');

const createAppValidation = Joi.object({
    name: Joi.string().required(),
});

module.exports = {
    createAppValidation
}