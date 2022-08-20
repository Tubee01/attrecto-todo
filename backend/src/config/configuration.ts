import { API_PORT, APP_SECRET, DATABASE_CONFIG } from "src/constants";

export default () => ({
    [API_PORT]: parseInt(process.env.API_PORT, 10) || 3000,
    [DATABASE_CONFIG]: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.POSTGRES_SERVER,
        port: parseInt(process.env.POSTGRES_PORT, 10) || 5432
    },
    [APP_SECRET]: process.env.APP_SECRET || 'secret',
});