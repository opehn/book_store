const winstonDaily = require("winston-daily-rotate-file");
const appRoot = require("app-root-path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
    const seoulTimestamp = new Date(timestamp).toLocaleString("ko-KR");
    return `${seoulTimestamp} [${level}] : ${message}`;
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
            format: format.combine(timestamp(), logFormat),
        })
    );
}

//custom function
function reportRequest(url, method) {
    this.info(`Received Request on ${url} by ${method}`);
    return;
}

function reportResponse(url, method, result) {
    this.info(`Send response to ${url} by ${method} : ${result.message}`);

}
function reportReponseErr(url, method, err) {
    this.error(`Request on ${url} by ${method} failed | ${err}`);
    return;
}

function reportDbErr(table, method, err) {
    this.error(`DB error : Failed to excute a ${method} query on the ${table} table | ${err}`);
}

logger.reportRequest = reportRequest.bind(logger);
logger.reportResponse = reportResponse.bind(logger);
logger.reportReponseErr = reportReponseErr.bind(logger);
logger.reportDbErr = reportDbErr.bind(logger);

module.exports = logger;
