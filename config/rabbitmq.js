const config = require('../src/config');

module.exports = {
    $schema: "../node_modules/rascal/lib/config/schema.json",
    vhosts: {
        "/": {
            connection: {
                "url": `amqp://${config.get('rabbitmq.user')}:${config.get('rabbitmq.pass')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}/`
            },
            exchanges: [
                "chats_ex"
            ],
            queues: [
                "chats_q"
            ],
            bindings: [
                "chats_ex -> chats_q"
            ],
            publications: {
                "chats_pub": {
                    "exchange": "chats_ex"
                }
            },
            subscriptions: {
                "chats_sub": {
                    "queue": "chats_q",
                    "prefetch": 50
                }
            }
        }
    }
}