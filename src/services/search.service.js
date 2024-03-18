const app = require('../app');

const syncMessage = async (message) => {
    console.log('Received message', message);

    const elasticClient = app.get('elasticClient');

    await elasticClient.index({
        index: 'messages_idx',
        body: message,
        id: `${message.token}-${message.chatNumber}-${message.number}`,
    });
};


const search = async (req, res) => {
    const elasticClient = app.get('elasticClient');

    try {
        const result = await elasticClient.search({
            index: 'messages_idx',
            body: {
                query: {
                    fuzzy: {
                        content: {
                            value: req.query.keyword,
                            fuzziness: 2
                        }
                    }
                }
            }
        });
        console.log(result)
        return res.json(result.hits.hits);
    } catch (error) {
        console.error('Error searching index:', error);
        throw error;
    }
};

module.exports = {
    syncMessage,
    search
};