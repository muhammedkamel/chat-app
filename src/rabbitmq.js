const Broker = require('rascal').BrokerAsPromised;
const config = require('../config/rabbitmq');
const { saveChatsBatch } = require('./services/chats.service');

module.exports = async function setupRabbitMQ(app) {
    const broker = await Broker.create(config);

    broker
        .on('connection', () => {
            console.log('Connected to RabbitMQ!');
        })
        .on('error', (err) => {
            console.error(err);
        });

    setupSubscriptions(broker);

    app.set('broker', broker);
};

async function setupSubscriptions(broker) {
    const chatsSubscription = await broker.subscribe('chats_sub');

    // @todo allow timeout for these messages
    const batchSize = 3;
    let messagesBuffer = [];

    chatsSubscription
        .on('message', async (message, content, ackOrNack) => {
            messagesBuffer.push(content);

            if (messagesBuffer.length >= batchSize) {
                await saveChatsBatch(messagesBuffer);

                messagesBuffer = [];
            }

            ackOrNack();
        })
        .on('error', console.error)
        .on('invalid_content', (err, message, ackOrNack) => {
            console.log('Failed to parse message', err);

            ackOrNack();
        });
}


