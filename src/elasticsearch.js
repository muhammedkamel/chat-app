const { Client } = require('@elastic/elasticsearch');
const config = require('../config/app');

module.exports = function setupElasticsearch(app) {
    const elasticClient = new Client({
        node: `${config.es.host}:${config.es.port}`,
        name: 'elasticsearch'
    });

    app.set('elasticClient', elasticClient);
}