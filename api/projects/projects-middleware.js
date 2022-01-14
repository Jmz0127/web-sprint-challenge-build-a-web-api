// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkProjectId(req, res, next) {
    try {
      const possibleProjectId = await Projects.get(req.params.id)
      if (possibleProjectId) {
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

  function validateProject(req, res, next) {
    // if the client doest not supply a name for the new hub
    // we want to respond with a 422 unprocessable entity
    // otherwise proceed to next middleware
    if (!req.body.name || !req.body.description) {
      next({ status: 400, message: "Please provide a name and description" })
    } else {
      next()
    }
  }



  module.exports = {
    checkProjectId,
    validateProject
  }