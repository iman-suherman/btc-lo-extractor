import serverless from 'serverless-http';

import { app } from './app';
import { getContents } from './lib/retriever';
import { updateResult } from './lib/updater';

export const handler = async (event: any, context: any) => {
    // init express app to serverless
    const handlerApp = serverless(app);

    // return result
    return await handlerApp(event, context);
};

export const listener = async (event: any, context: any) => {
    console.info('Event:', JSON.stringify(event));

    for (const record of event.Records) {
        const result = await getContents(JSON.parse(record?.Sns?.Message)?.JobId);

        await updateResult(result);
    }

    return context.succeed('OK');
};
