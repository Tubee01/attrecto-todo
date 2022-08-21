import {
  API_PORT,
  APP_SECRET,
  DATABASE_CONFIG,
  SMTP_SETTINGS,
} from 'src/utils/constants';

export default () => ({
  [API_PORT]: parseInt(process.env.API_PORT, 10) || 3000,
  [DATABASE_CONFIG]: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_SERVER,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  },
  [APP_SECRET]: process.env.APP_SECRET || 'secret',
  [SMTP_SETTINGS]: {
    host: process.env.SMTP_HOST,
    secure: parseInt(process.env.SMTP_PORT, 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
  },
});
