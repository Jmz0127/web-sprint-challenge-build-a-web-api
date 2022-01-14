const express = require('express');
const server = express();

// Configure your server here

server.use(express.json());
server.get('/', (req, res) => {
	res.send(`<h2>Here is the start of things!</h2>`);
});

// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
