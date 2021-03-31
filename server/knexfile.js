const dbConnectionString = require('./config').dbConnectionString;

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'secret',
      database: 'isa',
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
