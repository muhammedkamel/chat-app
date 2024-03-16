require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    db: {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            freezeTableName: true,
            timestamps: true,
            underscored: true,
        },
        pool: {
            min: Number.parseInt(process.env.DB_POOL_MIN, 10) || 10,
            max: Number.parseInt(process.env.DB_POOL_MAX, 10) || 10,
        },
    },
    rabbitmq: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASS,
        host: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    es: {
        host: process.env.ES_HOST,
        port: process.env.ES_PORT,
    },

    get: function (key) {
        if (!key) {
            return this;
        }

        const keys = key.split('.');
        let value = this;

        keys.forEach(k => {
            value = value[k];
        });

        return value;
    }
};

module.exports = config;