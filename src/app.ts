import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import pino from 'pino-http';
import { appConfig } from './config';
import { Container } from 'typedi';
import {
  useContainer as routingControllersUseContainer,
  useExpressServer
} from 'routing-controllers';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Use Helmet!
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Pino Logger
app.use(
  pino({
    transport: appConfig.isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            singleLine: true
          }
        }
      : undefined
  })
);

routingControllersUseContainer(Container);

useExpressServer(app, {
  cors: true,
  defaultErrorHandler: true,
  validation: {
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true
  },
  classTransformer: true,
  routePrefix: appConfig.routePrefix,
  controllers: [path.join(__dirname + appConfig.controllersDir)],
  middlewares: [path.join(__dirname + appConfig.middlewaresDir)]
});

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello World');
});

// Warn
/*app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: 'Page Not Found!' });
});*/

export default app;
