// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');
const {checkActionId} = require('./actions-middlware')


router.get('/', async (req, res, next) => {
	// return array of all actions
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
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

module.exports = router;