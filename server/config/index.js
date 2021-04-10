module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbURL: process.env.DATABASE_URL,
  corsDomain: process.env.CORS_DOMAIN,
  secret: process.env.SECRET || 'secret',
  tokenExpiresInHours: process.env.TOKEN_EXPIRES_IN_HOURS || 24,
};
