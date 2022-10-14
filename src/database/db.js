import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();

/* const { Pool } = pg;
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection; */

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const connection = new Pool(databaseConfig);

export default connection;