require('ts-node/register');

const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env.development';
    case 'test':
      return '.env.test';
    case 'production':
      return '.env';
    default:
      return '.env';
  }
})();

require('dotenv').config({
  path: envFile,
});
const config = require('./config.ts');

module.exports = config.default;