// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkProjectId(req, res, next) {
	try {
		const possibleProjectId = await Projects.get(req.params.id);
		if (possibleProjectId) {
			req.project = possibleProjectId;
			next();
		} else {
			// send an error to the err handling middleware in server.js
			next({ status: 404, message: `No Project with id of ${req.params.id}` });
		}
	} catch (err) {
		next(err);
	}
}


function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim()) {
        res.status(400).json({
            message: "missing required name entry"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required description entry"
        })
    } else if (completed === undefined) {
        res.status(400).json({
            message: "missing required completed entry"
        })
    } else {
        req.name = name.trim();
        req.description = description.trim();
        req.completed = completed;
        next();
    }
}

module.exports = {
	checkProjectId,
    validateProject,
};
