async function getJsonOrStringFromRequest(req) {
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    try {
        // return body;
        return JSON.parse(body);
    } catch (error) {
        return body;
    }
}

module.exports = {
    getJsonOrStringFromRequest
};