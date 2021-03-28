const dbConnectionString = require('./config').dbConnectionString;

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      connectionString: 'mysql://root:secret@localhost:3306/isa',
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },

  production: {
    client: 'mysql2',
    connection: {
      connectionString: dbConnectionString,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: { directory: './db/seeds' },
  },
};
