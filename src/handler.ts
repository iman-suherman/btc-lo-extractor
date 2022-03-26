import serverless from 'serverless-http';

import { app } from './app';

export const handler = async (event: any, context: any) => {
    // init express app to serverless
    const handlerApp = serverless(app);

    // return result
    return await handlerApp(event, context);
};
