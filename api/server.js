const express = require('express');

//set up router URI shortcuts

// const actionRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');

const server = express();

// Configure your server here

//parse JSON in request bodies
server.use(express.json());




// server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectRouter)


//base level response of server
server.get('/', (req, res) => {
	res.send(`<h2>Here is the start of things!</h2>`);
});


server.use('*', (req, res) => {
    // catch all 404 errors middleware
    res.status(404).json({ message: `${req.method} ${req.baseUrl} was not found!` });
  });
  
  server.use((err, req, res, next) => { // eslint-disable-line
    console.log('ruh roh!')
    res.status(err.status || 500).json({
      message: `The Nerve: ${err.message}`,
    })
  })
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
