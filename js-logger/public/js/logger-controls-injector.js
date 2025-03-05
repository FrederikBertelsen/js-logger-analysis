/**
 * Logger controls functionality
 * Handles fetching available loggers, populating UI controls,
 * and switching between loggers
 */

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

            // Select the default values
            loggerSelector.value = 'console';
            levelSelector.value = 'info';
        })
        .catch(err => console.error('Error fetching logger types:', err));
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
                console.log(`Logger switched to ${loggerType} with level ${logLevel}`);
                // alert(`Logger switched to ${loggerType} with level ${logLevel}`);
            })
            .catch(err => console.error('Error switching logger:', err));
    });
}