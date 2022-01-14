// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model');
const { checkProjectId, validateProject } = require('./projects-middleware');

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

//post
router.post('/', validateProject, (req, res, next) => {
	Projects.insert(req.body)
		.then((projects) => {
			res.status(201).json(projects);
		})
		.catch((err) => {
			next(err);
		});
});

//put
router.put('/:id', checkProjectId, validateProject, async (req, res, next) => {
	//only works with async, research as to why
	try {
		const updated = await Projects.update(req.params.id, req.body);
		res.status(200).json(updated);
	} catch (err) {
		next(err);
	}
});

//delete
router.delete('/:id', checkProjectId, (req, res, next) => {
	Projects.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'The Project has been nuked💣' });
		})
		.catch((error) => {
			next(error);
		});
});

router.get('/:id/actions', checkProjectId, (req, res, next) => {
	Projects.getProjectActions(req.params.id) 
		.then((messages) => {
			res.status(200).json(messages);
		})
		.catch(next);
});

module.exports = router;