// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
// const {} = require('./projects-middleware') open this up once middleware is added

router.get('/', async (req, res, next) => {
	// return array of all projects
	try {
		const projects = await Projects.get();
		res.status(200).json(projects);
	} catch (err) {
		next(err);
	}
});


router.get('/:id', async (req, res, next) => {
	try {
		const project = await Projects.get(req.params.id);
		console.log('whoa it worked!', project);
		res.status(200).json(project);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
