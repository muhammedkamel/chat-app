const express = require('express');
const { createApp } = require('../services/apps-service');
const ExpressJoiValidation = require('express-joi-validation');
const { createAppValidation } = require('../validations/apps');

const router = express.Router();
const validator = ExpressJoiValidation.createValidator({ passError: true });

/* GET users listing. */
router.post('/', validator.body(createAppValidation), createApp);

module.exports = router;
