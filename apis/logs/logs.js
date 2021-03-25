const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');

const router = Router();

router.route('/').get(async (req, res, next) => {
    try {
        const exerciseId = req.query.exerciseId;
        let searchObj = {};

        if (exerciseId) {
            searchObj.exerciseInfo = exerciseId;
        }

        const log = req.context.models.Log.ExerciseLog;
        const logs = await log
            .find(searchObj)
            .sort({ createdAt: 'descending' })
            .populate('exerciseInfo');
        res.send({ success: true, data: logs });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route('/').post(async (req, res, next) => {
    try {
        const log = req.context.models.Log.ExerciseLog;
        const Session = req.context.models.Session;
        const loggedTime = req.body.loggedTime;

        console.log('reqBody', req.body);

        //could do some check here and filter the data based on log type and then insertMany

        const exerciseLogs = req.body.logs.filter(
            (logs) => logs.logType === 'exercise'
        );

        //Change this change, probably should only error if we didn't have results from any log type
        if (!exerciseLogs && exerciseLogs.length === 0) {
            throw new Error('There were no logs to log brah');
        }

        const logs = await log.insertMany(exerciseLogs).then((logsResult) => {
            console.log('result ', logsResult);
            return logsResult;
        });

        const logIds = logs.map((log) => log._id);

        console.log(req.context.models, 'MODELS');

        const sessionItem = await Session({
            logs: logIds,
            loggedTime,
        }).save();

        const session = await Session.findOne(sessionItem).populate('logs');

        res.send({ success: true, data: session });
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

    const logsFound = await req.context.models.Log.search(req.body.search);

    if (logsFound) {
        res.send({
            success: true,
            data: logsFound,
        });
    } else {
        res.send({
            success: true,
            data: 'No Logs Found',
        });
    }
});

router.route('/log/:logId').delete(async (req, res, next) => {
    const { logId } = req.params;

    try {
        const log = req.context.models.Log;
        const logDeleted = await log.deleteOne({ _id: logId });
        res.send({ success: true, data: logDeleted });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;
