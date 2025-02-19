const http = require('http');
const fs = require('fs');
const { parseJSONFromRequest } = require('./utils');


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello world' }));
    }
    else if (req.method === 'GET' && req.url === '/index.html') {
        fs.readFile('public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    else if (req.method === 'POST' && req.url === '/api/event') {
        parseJSONFromRequest(req).then((json) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(json));

            console.log(json);
        }).catch((error) => {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid JSON');
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(4000, () => console.log('Server running on port 4000'));