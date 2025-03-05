/**
 * Logger controls functionality
 * Handles fetching available loggers, populating UI controls,
 * and switching between loggers
 */

// Store the current logger information globally
let currentLoggerInfo = {
    logger: null,
    level: null
};

// Create and set up the logger controls immediately
(function () {
    createLoggerControlsUI();
    loadLoggerOptions();
    setupLoggerSwitching();
})();

/**
 * Creates and inserts the logger controls UI into the DOM
 */
function createLoggerControlsUI() {
    // Create the container element
    const container = document.createElement('div');
    container.className = 'logger-controls';

    // Create HTML structure for controls
    container.innerHTML = `
        <p>Backend Logger</p>

        <div class="inline-group">
            <label for="logger-type">Logger:</label>
            <select id="logger-type">
                <option value="">Loading...</option>
            </select>
        </div>
        <div class="inline-group">
            <label for="log-level">Level:</label>
            <select id="log-level">
                <option value="">Loading...</option>
            </select>
        </div>
        <button id="set-logger">Apply</button>
    `;

    // Insert at the beginning of the body or another appropriate location
    document.body.prepend(container);
}

function loadLoggerOptions() {
    // First fetch all available loggers and levels
    fetch('/logger-types')
        .then(response => response.json())
        .then(data => {
            const loggerSelector = document.getElementById('logger-type');
            const levelSelector = document.getElementById('log-level');

            // Clear "Loading..." options
            loggerSelector.innerHTML = '';
            levelSelector.innerHTML = '';

            // Populate logger types
            data.loggers.forEach(logger => {
                const option = document.createElement('option');
                option.value = logger;
                option.textContent = logger;
                loggerSelector.appendChild(option);
            });

            // Populate log levels
            data.levels.forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level;
                levelSelector.appendChild(option);
            });

            // After populating options, fetch and set current logger settings
            fetchCurrentLoggerSettings();
        })
        .catch(err => console.error('Error fetching logger types:', err));
}

function fetchCurrentLoggerSettings() {
    fetch('/current-logger')
        .then(response => response.json())
        .then(data => {
            // Set the dropdowns to match the current server settings
            const loggerSelector = document.getElementById('logger-type');
            const levelSelector = document.getElementById('log-level');

            loggerSelector.value = data.logger;
            levelSelector.value = data.level;

            // Store the current logger info globally
            currentLoggerInfo.logger = data.logger;
            currentLoggerInfo.level = data.level;
        })
        .catch(err => console.error('Error fetching current logger settings:', err));
}

function setupLoggerSwitching() {
    document.getElementById('set-logger').addEventListener('click', () => {
        const loggerType = document.getElementById('logger-type').value;
        const logLevel = document.getElementById('log-level').value;

        if (!loggerType) {
            alert('Please select a logger type');
            return;
        }

        // Send request to switch logger
        fetch('/api/switch-logger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                logger: loggerType,
                options: { level: logLevel }
            })
        })
            .then(() => {
                // Update the current logger info
                currentLoggerInfo.logger = loggerType;
                currentLoggerInfo.level = logLevel;

                console.log(`Logger switched to ${loggerType} with level ${logLevel}`);
                // alert(`Logger switched to ${loggerType} with level ${logLevel}`);
            })
            .catch(err => console.error('Error switching logger:', err));
    });
}

/**
 * Returns the string name of the currently selected logger in lowercase
 * @returns {string|null} The current logger type (e.g., "pino", "winston", "console")
 */
function getCurrentLoggerType() {
    return currentLoggerInfo.logger;
}

/**
 * Returns the current log level
 * @returns {string|null} The current log level (e.g., "info", "debug", "error")
 */
function getCurrentLogLevel() {
    return currentLoggerInfo.level;
}

// Make these functions available globally if needed
window.getCurrentLoggerType = getCurrentLoggerType;
window.getCurrentLogLevel = getCurrentLogLevel;