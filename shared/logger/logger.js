const winstonDaily = require("winston-daily-rotate-file");
const appRoot = require("app-root-path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;


const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] : ${message}`;
})

let logDir = `${appRoot}/log`;

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
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        })
    );
}

//custom function
function receiveLog(url, method) {
    logger.info(`Received Request on ${url} by ${method}`);
    return;
}

function responseLog(url, method, result) {
    logger.info(`Send response to ${url} by ${method} : ${result.message}`);

}
function responseErrLog(url, method, err) {
    logger.error(`Request on ${url} by ${method} failed | ${err}`);
    return;
}

logger.receiveLog = receiveLog.bind(logger);
logger.responseLog = responseLog.bind(logger);
logger.responseErrLog = responseErrLog.bind(logger);


module.exports = logger;
