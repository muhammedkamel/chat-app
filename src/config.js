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
    get: function (key) {
        return this[key] || null;
    }
};

module.exports = config;