declare module 'database' {
    import { Client } from 'pg';

    export const client: Client;
    export const connectDB: () => Promise<void>;
    export const disconnectDB: () => Promise<void>;
} 