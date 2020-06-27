import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Successfully connected with database'))
  .catch(() => console.log('Failed to connect to the database'));
