const config = require('../src/config');

module.exports = {
  development: {
    ...config.db,
    migrationStorageTableName: 'migrations',
    // logging: (...msg) => {
    //   logger.debug('DATABASE QUERY', { query: msg[0], time: msg[1] });
    // },
  }
};
