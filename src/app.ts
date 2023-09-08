import express from 'express';
import helmet from 'helmet';
import pino from 'pino-http';
import { config } from './config';
import 'dotenv/config';

const app = express();

// Use Helmet!
app.use(helmet());

// Pino Logger
app.use(
  pino({
    transport:
      config.env === 'development'
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

app.listen(3000);
