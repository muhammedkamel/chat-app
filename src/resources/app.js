const R = require('ramda')

module.exports = (app) => {
    return R.omit(['id'], app.dataValues);
}