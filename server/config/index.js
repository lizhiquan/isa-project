module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
};
