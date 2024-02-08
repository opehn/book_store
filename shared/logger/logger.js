"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var winstonDaily = require("winston-daily-rotate-file");
var appRoot = require("app-root-path");
var Logger = winston.Logger;
var createLogger = winston.createLogger, format = winston.format, transports = winston.transports;
var combine = format.combine, timestamp = format.timestamp, printf = format.printf;
var logFormat = printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    var seoulTimestamp = new Date(timestamp).toLocaleString("ko-KR");
    return "".concat(seoulTimestamp, " [").concat(level, "] : ").concat(message);
});
var logDir = "".concat(appRoot, "/log");
var logger = createLogger({
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
    logger.add(new transports.Console({
        format: format.combine(timestamp(), logFormat),
    }));
}
//custom function
logger.reportRequest = function (url, method) {
    this.info("Received Request on ".concat(url, " by ").concat(method));
    return;
};
//TODO : result 객체 타입 정의..
logger.reportResponse = function (url, method, result) {
    this.info("Send response to ".concat(url, " by ").concat(method, " : ").concat(result.message));
};
logger.reportResponseErr = function (url, method, err) {
    this.error("Request on ".concat(url, " by ").concat(method, " failed | ").concat(err));
    return;
};
logger.reportDbErr = function (table, method, err) {
    this.error("DB error : Failed to excute a ".concat(method, " query on the ").concat(table, " table | ").concat(err));
};
exports.default = logger;
