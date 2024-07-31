import { Client } from 'pg';

let client: Client | null = null;

export const getClient = async (): Promise<Client> => {
    if (!client) {
        client = new Client({
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
