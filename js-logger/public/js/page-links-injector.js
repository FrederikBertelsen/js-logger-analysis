(function () {
    // Static list of HTML files in the public directory
    // Update this list whenever you add or remove HTML files
    const htmlPages = [
        { name: 'MyLogger', path: 'index.html' },
        { name: 'js-Logger', path: 'js-logger.html' },
        { name: 'JSNLog', path: 'jsnlog.html' },
        { name: 'LogLevel', path: 'loglevel.html' },
        // Add more pages as needed
    ];

    // Determine current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Create navigation HTML
    let navLinks = '';
    htmlPages.forEach(page => {
        const isActive = currentPath === page.path ? 'active-link' : '';
        navLinks += `<button onclick="window.location.href='/${page.path}'" class="${isActive}">${page.name}</button>`;
    });

    // Create the HTML with existing CSS classes
    const navHTML = `
    <div class="page-navigation inline-group">${navLinks}</div>
    `;

    // Inject the navigation HTML
    document.write(navHTML);
})();