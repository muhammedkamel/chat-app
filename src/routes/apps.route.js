const express = require('express');
const { createApp, getApps, updateApp } = require('../services/apps.service');
const ExpressJoiValidation = require('express-joi-validation');
const { createAppValidation } = require('../validations/apps.validation');

const router = express.Router();
const validator = ExpressJoiValidation.createValidator({ passError: true });

router.get('/', getApps);
router.post('/', validator.body(createAppValidation), createApp);
router.put('/:token', validator.body(createAppValidation), updateApp);

module.exports = router;
