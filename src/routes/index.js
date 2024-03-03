const express = require('express');
const router = express.Router();
const appsRouter = require('./apps.route');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ message: 'Hello World!' });
});

router.use('/apps', appsRouter);

module.exports = router;
