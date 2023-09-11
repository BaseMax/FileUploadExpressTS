import app from './app';
import { appConfig } from './config';
import { logger } from './utils';

const host = appConfig.host;
const port = appConfig.port;

app.listen(+port, () => {
  logger.info(
    `🚀 Server started at http://${host}:${port}\n🚨️ Environment: ${appConfig.node}`
  );
});
