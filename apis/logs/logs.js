const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');

const router = Router();

router.route('/').get(async (req, res, next) => {
    try {
        const log = req.context.models.Log;
        const logs = await log.find({});
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
        const log = req.context.models.Log;
        const Session = req.context.models.Session;

        console.log('reqBody', req.body);

        const logs = await log.insertMany(req.body).then((logsResult) => {
            console.log('result ', logsResult);
            return logsResult;
        });

        const logIds = logs.map((log) => log._id);

        console.log(req.context.models, 'MODELS');

        const sessionItem = await Session({
            logs: logIds,
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
