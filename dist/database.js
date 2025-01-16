"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.disconnectDB = exports.connectDB = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client = null;
exports.client = client;
const connectDB = async () => {
    if (!client) {
        console.log(process.env.DB_HOST);
        exports.client = client = new pg_1.Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT)
        });
    }
    try {
        await client.connect();
        console.log("Connected to PostgreSQL database");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    if (client) {
        await client.end();
        exports.client = client = null;
        console.log("Disconnected from PostgreSQL database");
    }
};
exports.disconnectDB = disconnectDB;
