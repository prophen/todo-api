import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request body
app.use(bodyParser.json());

app.use(cors());

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 14918,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Task],
  synchronize: true,
  ssl: {
    ca: process.env.SSL_CERT,
  },
});
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization',
      err,
    );
  });

app.use('/', tasksRouter);
