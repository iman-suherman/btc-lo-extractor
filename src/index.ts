import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import dayjs from 'dayjs';

const APP_PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
app.listen(APP_PORT, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`${dayjs().format()} - Server has started on port http://127.0.0.1:${APP_PORT}`);
});
