/**
 * Event tracker functionality
 * Handles generating session IDs and tracking various user interactions
 */

// Set up all event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupButtonClickEvents();
    setupTextInputEvents();
    setupCheckboxEvents();
    setupRadioEvents();
    setupSelectEvents();
    setupFileInputEvents();
    setupRangeEvents();
    setupLinkEvents();
});

function setupButtonClickEvents() {
    document.getElementById('btn-click').addEventListener('click', () => {
        sendEvent('info', { event: 'buttonClicked' });
    });

    var big_string = '';
    for (var i = 0; i < 5000; i++) {
        // Generate random character code in the printable ASCII range (32-126)
        const randomCharCode = Math.floor(Math.random() * (126 - 32 + 1)) + 32;
        big_string += String.fromCharCode(randomCharCode);
    }
    window.big_string = big_string;

    document.getElementById('btn-click-big').addEventListener('click', () => {
        sendEvent('info', { event: window.big_string });
    });
}

function setupTextInputEvents() {
    const textInput = document.getElementById('text-input');
    textInput.addEventListener('input', () => {
        sendEvent('info', { event: 'textInputChanged', value: textInput.value });
    });
    textInput.addEventListener('blur', () => {
        sendEvent('info', { event: 'textInputBlur', value: textInput.value });
    });
}

function setupCheckboxEvents() {
    const checkbox = document.getElementById('checkbox');
    checkbox.addEventListener('change', () => {
        sendEvent('info', { event: 'checkboxToggled', checked: checkbox.checked });
    });
}

function setupRadioEvents() {
    const radios = document.getElementsByName('radio-group');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                sendEvent('info', { event: 'radioSelected', value: radio.value });
            }
        });
    });
}

function setupSelectEvents() {
    const selectEl = document.getElementById('select');
    selectEl.addEventListener('change', () => {
        sendEvent('info', { event: 'selectChanged', value: selectEl.value });
    });
}

function setupFileInputEvents() {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', () => {
        // For security reasons, browsers do not give you the file path.
        // We can capture file information such as name and size.
        const files = Array.from(fileInput.files).map(file => ({ name: file.name, size: file.size }));
        sendEvent('info', { event: 'fileSelected', files: files });
    });
}

function setupRangeEvents() {
    const rangeInput = document.getElementById('range-input');
    const rangeValue = document.getElementById('range-value');
    rangeInput.addEventListener('input', () => {
        rangeValue.textContent = rangeInput.value;
        sendEvent('info', { event: 'rangeChanged', value: rangeInput.value });
    });
}

function setupLinkEvents() {
    const link = document.getElementById('link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sendEvent('info', { event: 'linkClicked', href: link.href });
    });
}