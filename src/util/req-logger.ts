import winston from "winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint } = format;
const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      filename: "./public/debug.log",
      level: "debug",
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
