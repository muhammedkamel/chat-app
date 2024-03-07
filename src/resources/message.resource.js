const R = require('ramda')

module.exports = (message) => {
    return R.omit(['id', 'chatId'], message.dataValues || message);
}