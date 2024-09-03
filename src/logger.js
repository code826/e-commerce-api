import moment from "moment";
import winston from "winston";

//basic
// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "src/storage/logs/logger.log" }),
//   ],
// });

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
      return `[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${info.level}:${
        info.stack || info.message
      }`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: `storage/logs/${moment().format("YYYY-MM-DD")}_logger.log`,
    }),
  ],
});

export default logger;
