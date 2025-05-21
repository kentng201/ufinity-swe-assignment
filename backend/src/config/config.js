require('ts-node/register');

require('dotenv').config();
const config = require('./config.ts');

module.exports = config.default;