const express = require('express')
const path = require('path')
const app = express()
const port = 4000;

// Middleware to parse JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Optional: An explicit route for the homepage.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to receive events from the client.
app.post('/api/event', (req, res) => {
    const eventData = req.body;
    console.log('Received event data:', eventData);

    // Here, you could integrate your logger library to log the event.

    // Return a response to the client.
    res.json({ status: 'success', received: eventData });
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});