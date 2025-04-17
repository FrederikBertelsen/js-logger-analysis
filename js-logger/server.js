const http = require('http');
const fs = require('fs');
const path = require('path');
const LoggerWrapper = require('./logger-wrapper');
const utils = require('./utils');
const { performance } = require('perf_hooks');

const logger = new LoggerWrapper('console', { level: 'info' });
const port = process.argv[2] || 4000;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Function to serve static files
const serveStaticFile = (res, filePath) => {
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            }
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
};

// Log duration collection configuration
let logDurations = [];
const LOG_BATCH_SIZE = 5000;
const LOG_FILE_PATH = path.join(__dirname, 'logDurations.txt');
let isWritingToFile = false;

// Function to append log durations to file
const appendLogDurationsToFile = () => {
    if (logDurations.length === 0 || isWritingToFile) return;

    isWritingToFile = true;
    const dataToWrite = logDurations.join('\n') + '\n';
    logDurations = [];

    fs.appendFile(LOG_FILE_PATH, dataToWrite, (err) => {
        isWritingToFile = false;
        if (err) {
            console.error('Error writing to log durations file:', err);
        } else {
            console.log(`${dataToWrite.split('\n').length - 1} log durations appended to ${LOG_FILE_PATH}`);
        }

        // If more data accumulated while writing, write again
        if (logDurations.length >= LOG_BATCH_SIZE) {
            appendLogDurationsToFile();
        }
    });
};

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Go to a page! For example /index.html' }));
    }
    else if (req.method === 'GET' && req.url === '/logger-types') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            loggers: LoggerWrapper.registeredLoggerNames,
            levels: LoggerWrapper.LOG_LEVELS
        }));
    }
    else if (req.method === 'GET' && req.url === '/current-logger') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            logger: logger.getLoggerType(), // Use getLoggerType() instead of activeLogger
            level: logger.options.level
        }));
    }
    else if (req.method === 'POST' && req.url === '/api/event') {
        utils.getJsonOrStringFromRequest(req).then((json) => {
            // console.log("Raw data received:", json);
            const processLogEntry = (log) => {
                if (log.level) {
                    const level = log.level;
                    delete log.level;

                    const startedAt = performance.now();
                    logger.log(level.toLowerCase(), log);
                    const finishedAt = performance.now();

                    const duration = finishedAt - startedAt;
                    logDurations.push(duration);
                } else {
                    const startedAt = performance.now();
                    logger.log(log);
                    const finishedAt = performance.now();

                    const duration = finishedAt - startedAt;
                    logDurations.push(duration);
                }

                if (logDurations.length >= LOG_BATCH_SIZE) {
                    appendLogDurationsToFile();
                }
            };

            res.writeHead(200);
            res.end();
        }).catch((error) => {
            console.log("Error happend: ", error);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid JSON');
        });
    }
    else if (req.method === 'POST' && req.url === '/api/switch-logger') {
        utils.getJsonOrStringFromRequest(req).then((json) => {
            console.log(`\nSwitched logger to ${json.logger} with options:`, json.options, '\n');

            logger.switchLogger(json.logger, json.options);

            res.writeHead(200);
            res.end();
        }).catch((error) => {
            console.log("Error happend: ", error);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid JSON');
        });
    }
    // Static file handler for public folder
    else if (req.method === 'GET') {
        // Remove any query parameters
        const url = req.url.split('?')[0];

        // Security check to prevent directory traversal
        if (url.includes('..')) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            return;
        }

        // Map URL to file path (remove leading slash)
        const filePath = path.join('public', url.replace(/^\//, ''));

        serveStaticFile(res, filePath);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(port, () => console.log(`Server running on port ${port}`));