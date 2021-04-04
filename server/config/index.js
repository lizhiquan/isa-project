module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  corsDomain: process.env.CORS_DOMAIN,
  secret: process.env.SECRET || 'secret',
  tokenExpiresInHours: process.env.TOKEN_EXPIRES_IN_HOURS || 24,
};
