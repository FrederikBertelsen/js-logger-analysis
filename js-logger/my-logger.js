const fs = require('fs/promises');
const path = require('path');

class MyLogger {
    constructor(logDir = 'logs') {
        this.logDir = logDir;
    }

    async log(data) {
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
                : JSON.stringify(data, null, 0);

            // Append to file with newline
            await fs.appendFile(filepath, logEntry + '\n');
        } catch (error) {
            console.error('Logging failed:', error);
        }
    }
}

module.exports = new MyLogger();