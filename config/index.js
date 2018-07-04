'use strict';

const development = require('./env/development');

module.exports = {
    development: Object.assign({}, development)
}[process.env.NODE_EN || 'development'];