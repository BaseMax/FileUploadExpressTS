import express from 'express';
import helmet from 'helmet';
import pino from 'pino-http';
import { appConfig } from './config';

const app = express();

// Use Helmet!
app.use(helmet());

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

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(appConfig.port);
