import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import AuthMiddleware from './app/middlewares/AuthMiddleware';

const routes = Router();

routes.post('/', UserController.store);
routes.post('/auth', AuthController.authenticate);

// Requires authentication
routes.get('/', AuthMiddleware, UserController.index);

export default routes;
