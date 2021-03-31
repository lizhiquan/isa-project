module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbConnectionString: process.env.DB_CONNECTION_STRING,
  corsDomain: process.env.CORS_DOMAIN,
  secret: process.env.SECRET || 'secret',
  tokenExpiresInHours: process.env.TOKEN_EXPIRES_IN_HOURS || 24,
};
