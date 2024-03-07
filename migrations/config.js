const config = require('../config/app')

module.exports = {
  development: {
    ...config.db,
    migrationStorageTableName: 'migrations',
    // logging: (...msg) => {
    //   logger.debug('DATABASE QUERY', { query: msg[0], time: msg[1] });
    // },
  }
};
