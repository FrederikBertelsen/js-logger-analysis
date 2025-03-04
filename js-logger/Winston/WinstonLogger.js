import winston from 'winston'

const consoleLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const filesystemLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'logs.log' })]
});

const httpLogger = winston.createLogger({
        transports: [
            new winston.transports.Http({
                host: "bachelor.15263748.xyz",
                port: 443,
                ssl: true,
                path: "/api/event",
                batchCount: 1
    }),
  ],
});

export default class WinstonLogger {
  filesystem = filesystemLogger

  console = consoleLogger

  http = httpLogger
} 