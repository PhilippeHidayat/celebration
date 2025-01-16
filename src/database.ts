import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let client: Client | null = null;

export const connectDB = async () => {
    if (!client) {
        client = new Client({
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
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export const disconnectDB = async () => {
    if (client) {
        await client.end();
        client = null;
        console.log("Disconnected from PostgreSQL database");
    }
};

export { client };
