const fs = require('fs/promises');
const path = require('path');

class MyLogger {
    constructor(logDir = 'logs/my-logger') {
        this.logDir = logDir;
    }

    async log(level, data) {
        try {
            // Create logs directory if it doesn't exist
            await fs.mkdir(this.logDir, { recursive: true });

            // Generate filename based on current date/hour
            const now = new Date();
            const filename = now.toISOString().slice(0, 13).replace('T', '_') + '.log';
            const filepath = path.join(this.logDir, filename);

            // Convert input to minified JSON string if it's an object
            const logEntry = typeof data === 'string'
                ? data.trim()
                : JSON.stringify(level, null, 0)+JSON.stringify(data, null, 0);

            // Append to file with newline
            await fs.appendFile(filepath, logEntry + '\n');
        } catch (error) {
            console.error('Logging failed:', error);
        }
    }
}

module.exports = MyLogger;