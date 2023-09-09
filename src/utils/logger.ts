import pino from "pino";
import { appConfig } from "../config/app";

// Warn
export const logger = pino({
  transport: true
    ? {
        target: 'pino-pretty',
        options: {
          singleLine: true
        }
      }
    : undefined
});
