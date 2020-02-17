import {ILogger} from "../ILogger";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {App, Stack, Stage} from "../../server/appIdentity";

class ServerLogger implements ILogger {

    underlyingLogger: winston.Logger;

    constructor() {
        let fileTransport;
        if (process.env.NODE_ENV === 'production') {
            fileTransport = new DailyRotateFile({
                filename: `${App}.log`,
                dirname: `/var/log/${App}`,
                zippedArchive: true,
                maxSize: '50m',
                maxFiles: '7d',
                utc: true
            });
        } else {
            fileTransport = new winston.transports.Console({
                format: winston.format.simple()
            });
        }

        this.underlyingLogger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: {
                app: App,
                stack: Stack,
                stage: Stage
            },
            transports: [fileTransport]
        });
    }

    debug(message: string): void {
        this.underlyingLogger.log({
            level: 'debug',
            message
        })
    }

    info(message: string): void {
        this.underlyingLogger.log({
            level: 'info',
            message
        })
    }

    warn(message: string, error?: Error): void {
        this.underlyingLogger.log({
            level: 'warn',
            message,
            stack_trace: error?.stack
        })
    }

    error(message: string, error?: Error): void {
        this.underlyingLogger.log({
            level: 'error',
            message,
            stack_trace: error?.stack
        })
    }
}

export const logger: ILogger = new ServerLogger();