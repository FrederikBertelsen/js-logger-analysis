/**
 * Logger controls functionality
 * Handles fetching available loggers, populating UI controls,
 * and switching between loggers
 */

// Fetch available logger types and levels when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadLoggerOptions();
    setupLoggerSwitching();
});

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