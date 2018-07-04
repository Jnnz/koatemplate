'use strict';

const path = require('path');
const appRoot = require('app-root-path');

const BASE_PATH = path.join(appRoot.path, 'db');
const DB_USER = process.env.DB_USER,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_ADDR = process.env.DB_ADDR || 'localhost',
    DB_PORT = process.env.DB_PORT || 5432,
    DB_DATABASE = process.env.DB_DATABASE;

module.exports = {
    client: 'pg',
    connection: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_ADDR}:${DB_PORT}/${DB_DATABASE}`,
    migrations: {
        directory: path.join(BASE_PATH, 'migrations')
    }
};