import 'reflect-metadata';
import { app } from './app';
import serverless from 'serverless-http';

export const handler = async (event: any, context: any) => {
    // init express app to serverless
    const handlerApp = serverless(app);
    // return result
    return await handlerApp(event, context);
};
