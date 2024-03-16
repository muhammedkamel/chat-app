const app = require('./app');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const routes = require('./routes');
const middlewares = require('./middlewares');
const setupRabbitMQ = require('./rabbitmq');
const setupRedis = require('./redis');
const setupCronjobs = require('./cron-jobs');

setupRabbitMQ(app);
setupRedis(app);
setupCronjobs(app);

app.use(helmet({ frameguard: { action: 'deny' } }));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.use('/', routes);

app.use(...Object.values(middlewares));

const config = app.get('config');
const server = app.listen(config.get('port'), () => console.info(`Server started on port: ${config.get('port')}`));

server.on('listening', () => {
    // logger.info('Chatting app started on http://%s:%d',process.env.HOST, process.env.PORT);
    console.log('Chatting app started on http://%s:%d', config.get('host'), config.get('port'));
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise ', { promise: p, reason });
    // logger.error('Unhandled Rejection at: Promise ', { promise: p, reason });
});

function exitHandler() {
    // logger.info('EXITING... bye bye 👋');
    console.log('EXITING... bye bye 👋');
    process.exit();
}

// normal close
process.on('exit', exitHandler.bind(null));
// Interrupt (CTRL+C)
process.on('SIGINT', exitHandler.bind(null));
// Kill PID
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));