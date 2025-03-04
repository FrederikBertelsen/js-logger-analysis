'use strict';

/**
 * Logger Wrapper - A class to manage different logger implementations
 * allowing easy switching between logger types with proper cleanup.
 */
class LoggerWrapper {
    /**
     * Available log levels
     * @type {string[]}
     */
    static LOG_LEVELS = ['error', 'warn', 'info', 'debug', 'trace'];

    /**
     * Registry of available logger adapters
     * @private
     */
    static #registeredLoggers = new Map();

    /**
     * Get a list of all registered logger types
     * @returns {string[]} Array of registered logger type names
     */
    static get registeredLoggerNames() {
        return Array.from(this.#registeredLoggers.keys());
    }

    /**
     * Register a new logger adapter
     * @param {string} name - The name identifier for the logger
     * @param {Function} adapterClass - The adapter class constructor
     */
    static registerLogger(name, adapterClass) {
        LoggerWrapper.#registeredLoggers.set(name.toLowerCase(), adapterClass);
    }

    /**
     * @param {string|null} loggerType - Initial logger type to use
     * @param {Object} options - Configuration options for the logger
     */
    constructor(loggerType = null, options = {}) {
        this.activeLogger = null;
        this.options = options;
        this.activeLoggerType = null;

        // Set up method proxies for performance
        this.#setupLogMethodProxies();

        // Initialize with a logger if provided
        if (loggerType) {
            this.switchLogger(loggerType, options);
        }
    }

    /**
     * Create method proxies that will be redirected to the active logger
     * @private
     */
    #setupLogMethodProxies() {
        // Create proxy methods for all standard log levels
        LoggerWrapper.LOG_LEVELS.forEach(level => {
            this[level] = (...args) => {
                if (!this.activeLogger) {
                    throw new Error('No logger initialized. Call switchLogger first.');
                }
                return this.activeLogger[level](...args);
            };
        });

        // Additional logging methods
        this.log = (level, ...args) => {
            if (!this.activeLogger) {
                throw new Error('No logger initialized. Call switchLogger first.');
            }
            return this.activeLogger.log(level, ...args);
        };
    }

    /**
     * Switch to a different logger implementation
     * @param {string} loggerType - Type of logger to switch to
     * @param {Object} options - Configuration options for the logger
     * @returns {LoggerWrapper} this instance for chaining
     */
    switchLogger(loggerType, options = {}) {
        // Don't recreate if it's the same type
        if (this.activeLoggerType === loggerType.toLowerCase()) {
            return this;
        }

        // Clean up existing logger
        this.cleanup();

        // Merge options
        this.options = { ...this.options, ...options };

        // Create new logger
        this.activeLogger = this.#createLogger(loggerType, this.options);
        this.activeLoggerType = loggerType.toLowerCase();

        return this;
    }

    /**
     * Clean up the current logger
     */
    cleanup() {
        if (this.activeLogger) {
            // Call cleanup method if available
            if (typeof this.activeLogger.cleanup === 'function') {
                this.activeLogger.cleanup();
            }

            // Clear references to help garbage collection
            this.activeLogger = null;
            this.activeLoggerType = null;
        }
    }

    /**
     * Factory method to create logger instances
     * @private
     * @param {string} type - Type of logger to create
     * @param {Object} options - Configuration options
     * @returns {Object} Logger instance
     */
    #createLogger(type, options) {
        const loggerType = type.toLowerCase();
        const LoggerClass = LoggerWrapper.#registeredLoggers.get(loggerType);

        if (!LoggerClass) {
            throw new Error(`Unsupported logger type: ${type}. Available types: ${Array.from(LoggerWrapper.#registeredLoggers.keys()).join(', ')}`);
        }

        return new LoggerClass(options);
    }

    /**
     * Get the current logger instance
     * @returns {Object|null} The active logger instance
     */
    getLogger() {
        return this.activeLogger;
    }

    /**
     * Get the current logger type
     * @returns {string|null} The active logger type
     */
    getLoggerType() {
        return this.activeLoggerType;
    }
}

/**
 * Base Logger Adapter - Abstract class for logger implementations
 */
class BaseLoggerAdapter {
    constructor(options = {}) {
        this.options = options;
        this.level = options.level || 'info';
    }

    log(level, ...args) {
        throw new Error('Method not implemented');
    }

    error(...args) {
        return this.log('error', ...args);
    }

    warn(...args) {
        return this.log('warn', ...args);
    }

    info(...args) {
        return this.log('info', ...args);
    }

    debug(...args) {
        return this.log('debug', ...args);
    }

    trace(...args) {
        return this.log('trace', ...args);
    }

    cleanup() {
        // Override in subclasses if needed
    }
}

/**
 * Console Logger Adapter
 */
class ConsoleLoggerAdapter extends BaseLoggerAdapter {
    constructor(options = {}) {
        super(options);
        // Map level names to console methods
        this.levelMap = {
            error: 'error',
            warn: 'warn',
            info: 'info',
            debug: 'debug',
            trace: 'trace',
            // Fallback to log
            log: 'log'
        };
    }

    log(level, ...args) {
        const method = this.levelMap[level] || 'log';
        return console[method](...args);
    }
}

/**
 * MyLogger Adapter
 */
class MyLoggerAdapter extends BaseLoggerAdapter {
    constructor(options = {}) {
        super(options);
        // Import myLogger only when needed
        this.myLogger = require('./my-logger');
        this.instance = this.myLogger(options.logDir ?? "logs/my-logger");
    }

    log(level, ...args) {
        return this.instance.log(level, ...args);
    }

    cleanup() {
        if (this.instance) {
            this.instance = null;
        }
        this.myLogger = null;
    }
}


/**
 * Winston Logger Adapter
 */
class WinstonLoggerAdapter extends BaseLoggerAdapter {
    constructor(options = {}) {
        super(options);
        // Import winston only when needed
        this.winston = require('winston');
        this.instance = this.#createWinstonLogger(options);
    }

    #createWinstonLogger(options) {
        const config = {
            level: options.level || 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            // defaultMeta: { service: 'your-service-name' },
            transports: [
                new this.winston.transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                }),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/winston/combined.log' }),
            ]
        };

        // Apply custom winston options if provided
        if (options.winston) {
            Object.assign(config, options.winston);
        }

        return this.winston.createLogger(config);
    }

    log(level, ...args) {
        return this.instance.log(level, ...args);
    }

    cleanup() {
        // Close winston transports
        if (this.instance) {
            this.instance.close();
            this.instance = null;
        }
        this.winston = null;
    }
}

/**
 * Pino Logger Adapter
 */
class PinoLoggerAdapter extends BaseLoggerAdapter {
    constructor(options = {}) {
        super(options);
        // Import pino only when needed
        this.pino = require('pino');

        const config = {
            level: options.level || 'info'
        };

        // Apply custom pino options if provided
        if (options.pino) {
            Object.assign(config, options.pino);
        }

        this.instance = this.pino(config);
    }

    log(level, ...args) {
        if (args.length === 1) {
            return this.instance[level](args[0]);
        }

        const [message, ...meta] = args;
        return this.instance[level]({ msg: message, ...meta });
    }

    cleanup() {
        if (this.instance && typeof this.instance.flush === 'function') {
            this.instance.flush();
        }
        this.instance = null;
        this.pino = null;
    }
}

/**
 * JSNlog Logger Adapter
 */
class JsnlogLoggerAdapter extends BaseLoggerAdapter {
    constructor(options = {}) {
        super(options);
        // Import JSNlog only when needed
        this.jsnlog = require('jsnlog');
        this.jsnlogNodeJS = require('jsnlog-nodejs');

        const config = {
            level: options.level || 'info'
        };

        // Apply custom JSNLog options if provided
        if (options.jsnlog) {
            Object.assign(config, options.jsnlog);
        }

        this.instance = this.jsnlog.JL();
    }

    log(level, ...args) {
        if (args.length === 1) {
            this.instance.log(level, args[0]);
        }

        const [message, ...meta] = args;
        return this.instance.log(level, { msg: message, ...meta });
    }

    cleanup() {
        this.instance = null;
        this.jsnlog = null;
        this.jsnlogNodeJS = null;
    }
}

// Register built-in loggers
LoggerWrapper.registerLogger('console', ConsoleLoggerAdapter);
LoggerWrapper.registerLogger('my-logger', MyLoggerAdapter);
LoggerWrapper.registerLogger('jsnlog', JsnlogLoggerAdapter);
LoggerWrapper.registerLogger('winston', WinstonLoggerAdapter);
LoggerWrapper.registerLogger('pino', PinoLoggerAdapter);

module.exports = LoggerWrapper;