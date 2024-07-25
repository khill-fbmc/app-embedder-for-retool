// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DEV_HOST: process.env.DEV_HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
};
