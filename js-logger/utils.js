async function getDataFromRequest(req) {
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    try {
        return body;
        // return JSON.parse(body);
    } catch (error) {
        throw new Error('Invalid JSON');
    }
}

module.exports = {
    getDataFromRequest 
};