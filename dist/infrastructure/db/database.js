"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const pg_1 = require("pg");
let client = null;
const getClient = async () => {
    if (!client) {
        client = new pg_1.Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });
        await client.connect();
    }
    return client;
};
exports.getClient = getClient;
