export module Logging {
    var winston = require('winston');
    var stream = require('stream');
    var logger = new winston.Logger();
    var PassThrough = stream.PassThrough || require('readable-stream').PassThrough;

    if(process.env.NODE_ENV === 'dev') {
        logger.add(winston.transports.Console, {
            colorize: true,
            timestamp: true,
            level: 'info'
        });
    }

    export var logStream = new PassThrough();
    logStream.on('data', function(data) {
        log(data.toString());
    });

    export function log(message:string, args?:any) {
        args === undefined ? logger.info(message) : logger.info(message, args);
    }

    export function info(message:string, args?:any) {
        args === undefined ? logger.info(message) : logger.info(message, args);
    }

    export function warn(message:string, args?:any) {
        args === undefined ? logger.warn(message) : logger.warn(message, args);
    }

    export function error(message:string, args?:any) {
        args === undefined ? logger.error(message) : logger.error(message, args);
    }

    export function debug(message:string, args?:any) {
        args === undefined ? logger.debug(message) : logger.debug(message, args);
    }
}
