import { Router, Request, Response, NextFunction } from 'express';
import v1 from './v1';

// define routes
const routes = Router();

// default route
routes.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ code: 200, message: 'success' });
});

// default route for version 1
routes.use('/v1', v1);

export default routes;
