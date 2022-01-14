// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkProjectId(req, res, next) {
    try {
      const possibleProjectId = await Projects.get(req.params.id)
      if (possibleProjectId) {
        // we already have the hub
        req.project = possibleProjectId
        next()
      } else {
        // send an error to the err handling middleware in server.js
        next({ status: 404, message: `No Project with id of ${req.params.id}` })
      }
    } catch (err) {
      next(err)
    }
  }





  module.exports = {
    checkProjectId,
  }