// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkActionId (req, res, next) {
    try {
        const actions = await Actions.get(req.params.id)
        if(!actions) {
            next({
                status:404,
                message:"No action with the given id"
            })
        } else {
            req.actions = actions
            next()
        }
    } catch (err) {
        res.status(500).json({
            message:"Cannot find action"
        })
    }
}


module.exports = {
	checkActionId,
};