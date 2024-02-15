import winston = require('winston');
import winstonDaily = require('winston-daily-rotate-file');
import appRoot = require('app-root-path');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
    const seoulTimestamp = new Date(timestamp).toLocaleString("ko-KR");
    return `${seoulTimestamp} [${level}] : ${message}`;
})

let logDir = `${appRoot}/log`;

declare module 'winston' {
    interface Logger {
        reportRequest(url: string, method: string): void;
        reportResponse(url: string, method: string, result: any): void;
        reportResponseErr(url: string, method: string, err: string): void;
        reportDbErr(table: string, method: string, err: string): void;
    }
}

const logger = createLogger({
    format: combine(timestamp(), logFormat),
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
        new transports.Console({
            format: format.combine(timestamp(), logFormat),
        })
    );
}

//custom function
logger.reportRequest = function (url: string, method: string): void {
    this.info(`Received Request on ${url} by ${method}`);
    return;
}

//TODO : result 객체 타입 정의..
logger.reportResponse = function (url: string, method: string, message: string): void {
    this.info(`Send response to ${url} by ${method} : ${message}`);
}

logger.reportResponseErr = function (url: string, method: string, err: string): void {
    this.error(`Request on ${url} by ${method} failed | ${err}`);
    return;
}

logger.reportDbErr = function (table: string, method: string, err: string): void {
    this.error(`DB error : Failed to excute a ${method} query on the ${table} table | ${err}`);
}

export default logger;
