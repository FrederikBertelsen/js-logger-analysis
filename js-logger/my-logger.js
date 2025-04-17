const fs = require('fs/promises');
const path = require('path');

class MyLogger {
    constructor(logDir = 'logs/my-logger') {
        this.logDir = logDir;
        // Create logs directory if it doesn't exist
        fs.mkdir(this.logDir, { recursive: true });

        this.fileName = new Date().toISOString().slice(0, 13).replace('T', ':') + '.log';
        this.filePath = path.join(this.logDir, this.fileName);
    }

    async log(level, data) {
        try {
            // Convert input to minified JSON string if it's an object
            const logEntry = typeof data === 'string'
                ? data.trim()
                : JSON.stringify(level, null, 0) + JSON.stringify(data, null, 0);

            // Append to file with newline
            await fs.appendFile(this.filePath, logEntry + '\n');
        } catch (error) {
            console.error('Logging failed:', error);
        }
    }
}

module.exports = MyLogger;