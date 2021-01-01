const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');

const router = Router();

router.route('/').get(async (req, res, next) => {
    try {
        const goal = req.context.models.Goal;
        const goals = await goal.find({});
        res.send({ success: true, data: goals });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route('/goal').post(async (req, res, next) => {
    try {
        const goal = req.context.models.Goal(req.body);
        await goal.save();
        res.send({ success: true, data: goal });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route('/search').post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: 'Did not provide Search' });
    }

    console.log(req.body.search);

    const goalsFound = await req.context.models.Goal.search(req.body.search);

    if (goalsFound) {
        res.send({
            success: true,
            data: goalsFound,
        });
    } else {
        res.send({
            success: true,
            data: 'No Goals Found',
        });
    }
});

router.route('/goal/:goalId').delete(async (req, res, next) => {
    const { goalId } = req.params;

    try {
        const goal = req.context.models.Goal;
        const goalDeleted = await goal.deleteOne({ _id: goalId });
        res.send({ success: true, data: goalDeleted });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;
