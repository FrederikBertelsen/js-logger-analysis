(function () {
    // Form elements HTML content
    const formElementsHTML = `
    <div class="container">
        <h1>User Interaction Tracker</h1>

        <p>Interact with these elements to send events to the server.</p>

        <div class="form-group">
            <button id="btn-click">Click Me</button>
        </div>

        <div class="form-group inline-group">
            <label for="text-input">Text Input:</label>
            <input type="text" id="text-input" placeholder="Type something...">
        </div>

        <div class="form-group">
            <label for="checkbox" id="checkbox-label">
                <input type="checkbox" id="checkbox"> Check me!
            </label>
        </div>

        <div class="form-group">
            <p>Radio Buttons:</p>
            <label>
                <input type="radio" name="radio-group" value="option1"> Option 1
            </label>
            <label>
                <input type="radio" name="radio-group" value="option2"> Option 2
            </label>
            <label>
                <input type="radio" name="radio-group" value="option3"> Option 3
            </label>
        </div>

        <div class="form-group">
            <label for="select">Select an Option:</label>
            <select id="select">
                <option value="">--Choose an option--</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>

        <div class="form-group">
            <label for="file-input">Upload a File:</label>
            <input type="file" id="file-input">
        </div>

        <div class="form-group">
            <label for="range-input">Slide to set a value:</label>
            <input type="range" id="range-input" min="0" max="100" value="50">
            <span id="range-value">50</span>
        </div>

        <div class="form-group">
            <a href="#" id="link">Click this link</a>
        </div>
    </div>`;

    // Create a container element
    const container = document.createElement('div');

    // Set its HTML content
    container.innerHTML = formElementsHTML;

    // Insert the content into the page
    document.body.appendChild(container);
})();