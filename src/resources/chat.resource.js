const R = require('ramda')

module.exports = (chat) => {
    return R.omit(['id', 'appId'], chat.dataValues || chat);
}