const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');
const setupSequelize = require('./sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use(...Object.values(middlewares));

app.set('sequelizeClient', setupSequelize());

app.listen(process.env.PORT, () => console.info(`Server started on port: ${process.env.PORT}`));

module.exports = app;
