// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');
const { checkActionId, validateAction } = require('./actions-middlware');

router.get('/', async (req, res, next) => {
	// return array of all actions
	Actions.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch(next);
});

router.get('/:id', checkActionId, async (req, res, next) => {
	try {
		const actions = await Actions.get(req.params.id);
		console.log('whoa it worked!', actions);
		res.status(200).json(actions);
	} catch (err) {
		next(err);
	}
});

//post
router.post('/', validateAction, (req, res, next) => {
	Actions.insert(req.body)
		.then((actions) => {
			res.status(201).json(actions);
		})
		.catch((err) => {
			next(err);
		});
});

//put
router.put('/:id', checkActionId, validateAction, async (req, res, next) => {
	try {
		const updated = await Actions.update(req.params.id, req.body);
		res.status(200).json(updated);
	} catch (err) {
		next(err);
	}
});

//delete
router.delete('/:id', checkActionId, (req, res, next) => {
	Actions.remove(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'The Action has been nuked💣' });
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = router;
