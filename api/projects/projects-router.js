// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const {checkProjectId} = require('./projects-middleware') 

router.get('/', async (req, res, next) => {
	// return array of all projects
	try {
		const projects = await Projects.get();
		res.status(200).json(projects);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', checkProjectId, async (req, res, next) => {
	try {
		const projects = await Projects.get(req.params.id);
		console.log('whoa it worked!', projects);
		res.status(200).json(projects);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
