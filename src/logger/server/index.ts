import {LoggerFunctions} from "../LoggerFunctions";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {App, Stack, Stage} from "../../server/appIdentity";

interface LogEvent {
    "@timestamp"?: string;
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    stack_trace?: string;
}

class ServerLogger implements LoggerFunctions {

    underlyingLogger: winston.Logger;

    constructor() {
        let winstonConfig: winston.LoggerOptions;
        if (process.env.NODE_ENV === 'production') {
            winstonConfig = {
                level: 'info',
                defaultMeta: {
                    app: App,
                    stack: Stack,
                    stage: Stage
                },
                transports: [new DailyRotateFile({
                    filename: `${App}.log`,
                    dirname: `/var/log/${App}`,
                    zippedArchive: true,
                    maxSize: '50m',
                    maxFiles: '7d',
                    utc: true
                })],
                format: winston.format.json()
            }
        } else {
            winstonConfig = {
                level: 'debug',
                defaultMeta: {
                    app: App,
                    stack: Stack,
                    stage: Stage
                },
                transports: [new winston.transports.Console()],
                format: winston.format.printf((logObject) => {
                    const maybeTimestamp: unknown = logObject['@timestamp'];
                    const maybeStackTrace: unknown = logObject['stack_trace'];
                    const stackTrace = typeof maybeStackTrace === 'string' ? `, ${maybeStackTrace}` : '';
                    const timestamp = typeof maybeTimestamp === 'string' ? maybeTimestamp : 'Unknown Timestamp';

                    return `${timestamp} [${logObject.level}] ${logObject.message}${stackTrace}`;
                })
            };
        }

        this.underlyingLogger = winston.createLogger(winstonConfig);
    }

    private log(logObject: LogEvent): void {
        this.underlyingLogger.log({
            "@timestamp": new Date().toISOString(),
            ...logObject
        });
    }

    debug(message: string): void {
        this.log({
            level: 'debug',
            message
        })
    }

    info(message: string): void {
        this.log({
            level: 'info',
            message
        })
    }

    warn(message: string, error?: Error): void {
        this.log({
            level: 'warn',
            message,
            stack_trace: error?.stack
        })
    }

    error(message: string, error?: Error): void {
        this.log({
            level: 'error',
            message,
            stack_trace: error?.stack
        })
    }
}

export const logger: LoggerFunctions = new ServerLogger();