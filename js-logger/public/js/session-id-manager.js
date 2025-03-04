/**
 * Compact session ID manager
 */
(function () {
    // Get or create session ID
    function getSessionId() {
        let id = sessionStorage.getItem('sessionId');

        if (!id) {
            id = crypto.randomUUID();
            sessionStorage.setItem('sessionId', id);
        }

        return id;
    }

    // Expose API
    window.getSessionId = getSessionId;
})();