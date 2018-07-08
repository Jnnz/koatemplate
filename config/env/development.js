'use strict';

const path = require('path');
const appRoot = require('app-root-path');

const BASE_PATH = path.join(appRoot.path, 'db');

module.exports = {
    client: 'pg',
    connection: 'postgres://DB_USER:DB_PASSWORD@DB_ADDR:DB_PORT/DB_DATABASE',
    migrations: {
        directory: path.join(BASE_PATH, 'migrations')
    }
};