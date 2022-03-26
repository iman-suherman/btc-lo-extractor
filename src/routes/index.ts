import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swagger } from '../docs/swagger';
import { healthHandler, infoHandler } from './serverInfo';
import v1 from './v1';

// define routes
const routes = Router();

routes.get('/health', healthHandler);

routes.get('/info', infoHandler);

routes.get('/', infoHandler);

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// default route for version 1
routes.use('/v1', v1);

export default routes;
