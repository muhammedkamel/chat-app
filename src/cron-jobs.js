const cron = require('node-cron');
const { updateMessagesCount } = require('./services/chats.service');
const { updateChatsCount } = require('./services/apps.service');

module.exports = function setupCronjobs(app) {
    // chats count update
    cron.schedule('0 * * * *', updateChatsCount);

    // messages count update
    cron.schedule('0 * * * *', updateMessagesCount);

    app.set('cronjobs', cron);
};