(function () {
    // Static list of HTML files in the public directory
    // Update this list whenever you add or remove HTML files
    const htmlPages = [
        { name: 'Just fetch()', path: 'index.html' },
        { name: 'js-Logger', path: 'js-logger.html' },
        { name: 'JSNLog', path: 'jsnlog.html' },
        { name: 'LogLevel', path: 'loglevel.html' },
        { name: 'tslog', path: 'tslog.html' },
        { name: 'Churchill', path: 'churchill.html' },
        // Add more pages as needed
    ];

    // Determine current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Create navigation HTML
    let navLinks = '<p>Client Logger</p>';
    htmlPages.forEach(page => {
        const isActive = currentPath === page.path ? 'active-link' : '';
        navLinks += `<button onclick="window.location.href='/${page.path}'" class="${isActive}">${page.name}</button>`;
    });

    // Create the navigation element directly
    const navElement = document.createElement('div');
    navElement.className = 'page-navigation inline-group';
    navElement.innerHTML = navLinks;

    // Insert as the first element in the body
    // This ensures the navigation appears at the top of the page
    document.body.prepend(navElement);
})();