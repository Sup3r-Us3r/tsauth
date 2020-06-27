import 'reflect-metadata';
import express from 'express';

import './database/migrations/connect';

import routes from './routes';

class App {
  public server = express();

  constructor() {
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(routes);
  }
}

export default new App().server;
