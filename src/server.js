const express = require('express');
const indexRouter = require('./routes/index');
const dotenv = require('dotenv');
const notFoundHandler = require('./middlewares/404-error');
const errorHandler = require('./middlewares/error-handler');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(process.env.PORT, () => console.info(`Server started on port: ${process.env.PORT}`));

module.exports = app;
