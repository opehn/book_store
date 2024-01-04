const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const appRoot = require("app-root-path");
const { createLogger, format } = require("winston");
const { promiseHooks } = require("v8");
const { combine, timestamp, label, printf } = winston.format;


const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] : ${message}`;
})

let logDir = `${appRoot}/log`;

const logger = createLogger({
    format: (timestamp(), logFormat),
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.log",
            maxSize: "20m",
            maxFiles: "30d",
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.error.log",
            maxSize: "20m",
            maxFiles: "30d",
        }),
    ],
});

if (process.env.NODE_ENV != "prod") {
    logger.add(
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        })
    );
}

module.exports = logger;
