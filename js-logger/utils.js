async function parseJSONFromRequest(req) {
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    try {
        return JSON.parse(body);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

module.exports = {
    parseJSONFromRequest
};