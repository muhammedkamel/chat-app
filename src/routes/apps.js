const express = require('express');
const { getApps } = require('../services/apps-service');
const router = express.Router();

/* GET users listing. */
router.get('/', getApps);

module.exports = router;
