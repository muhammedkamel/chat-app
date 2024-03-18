const config = require('./app');

module.exports = {
    $schema: "../node_modules/rascal/lib/config/schema.json",
    vhosts: {
        "/": {
            connection: {
                "url": `amqp://${config.get('rabbitmq.user')}:${config.get('rabbitmq.pass')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}/`,
                slashes: true,
                protocol: "amqp",
                hostname: config.get('rabbitmq.host'),
                user: config.get('rabbitmq.user'),
                password: config.get('rabbitmq.pass'),
                port: config.get('rabbitmq.port'),
                vhost: '/',
                concurrency: 2,
                options: {
                    heartbeat: 10,
                },
                socketOptions: {
                    timeout: 10000
                },
                retry: {
                    min: 1000,
                    max: 60000,
                    factor: 2,
                    strategy: "exponential"
                }
            },
            exchanges: {
                chats_ex: {
                    type: "fanout",
                    options: {
                        durable: true
                    }
                },
                messages_ex: {
                    type: "fanout",
                    options: {
                        durable: true
                    }
                }
            },
            queues: [
                "chats_q",
                "messages_q",
                "elasticsearch_q",
            ],
            bindings: [
                "chats_ex -> chats_q",
                "messages_ex -> messages_q",
                "messages_ex -> elasticsearch_q",
            ],
            publications: {
                "chats_pub": {
                    "exchange": "chats_ex"
                },
                "messages_pub": {
                    "exchange": "messages_ex"
                }
            },
            subscriptions: {
                "chats_sub": {
                    "queue": "chats_q",
                    "prefetch": 50
                },
                "messages_sub": {
                    "queue": "messages_q",
                    "prefetch": 50
                },
                "elasticsearch_sub": {
                    "queue": "elasticsearch_q",
                    "prefetch": 1,
                }
            }
        }
    }
}