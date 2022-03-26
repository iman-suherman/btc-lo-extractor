import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import Routes from './routes';
import { Error } from './types/Routes';

// create express app
export const app: Application = express();

// add middleware to express application
app.set('trust proxy', true);

app.disable('x-powered-by');

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '50mb' }));

// set all routes
app.use(Routes);

// Middleware Default Error Handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.info('Error req:', req);

    // save to file logger
    const formatLog = {
        originalUrl: req.originalUrl,
        method: req.method,
        ip: req.ip,
        body: req.body,
        headers: req.headers,
        errMessage: error.message,
        errors: error.errors,
    };

    // eslint-disable-next-line no-console
    console.log(formatLog);

    console.info(next);

    // return error
    const errorCode = error.errors ? 400 : 500;

    res.status(errorCode).json({
        code: errorCode,
        message: error.message ? error.message : 'error',
        errors: error.errors,
    });
});

// Catch Error Not Found
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    console.info('Catch req:', req);

    // save to file logger
    const formatLog = {
        originalUrl: req.originalUrl,
        method: req.method,
        ip: req.ip,
        errMessage: `Route Not Found`,
    };

    // eslint-disable-next-line no-console
    console.log(formatLog);

    console.info(next);

    return res.status(404).json({
        code: 404,
        message: `Route Not Found: [${req.method}] ${req.path} - ${req.ip}`,
    });
});
