const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
const { readMockFile, writeMockFile } = require('../util/fileHelper');

const router = Router();

const mockFile = 'sessions';

router.route('/').get(async (req, res, next) => {
    try {
        const session = req.context.models.Session;
        const sessions = await session.find({}).populate('logs');
        res.send({ success: true, data: sessions });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

// "userId": 1,
// "sessionId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route('/session').post(async (req, res, next) => {
    try {
        const session = req.context.models.Session(req.body);
        await session.save();
        res.send({ success: true, data: session });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
    // const { name, type, isPublic, partsWorked, userId } = req.body;

    // const newSessionData = {
    //     sessionId: uuidv4(),
    //     userId,
    //     name,
    //     type,
    //     isPublic,
    //     partsWorked,
    //     dateCreated: moment().format(),
    // };

    // const sessionsJSON = readMockFile(mockFile);

    // const newSessionsData = [...sessionsJSON, newSessionData];

    // writeMockFile(mockFile, newSessionsData);

    // res.status(200).json({
    //     status: "success",
    //     data: newSessionData,
    // });
});

router.route('/search').post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: 'Did not provide Search' });
    }

    console.log(req.body.search);

    const sessionsFound = await req.context.models.Session.search(
        req.body.search
    );

    if (sessionsFound) {
        res.send({
            success: true,
            data: sessionsFound,
        });
    } else {
        res.send({
            success: true,
            data: 'No Sessions Found',
        });
    }
});

router.route('/session/:sessionId').delete((req, res, next) => {
    const { sessionId } = req.params;

    const sessionsJSON = readMockFile(mockFile);

    const foundSessionIndex = sessionsJSON.findIndex(
        (session) => session.sessionId === sessionId
    );

    //removeIndexOfFound
    sessionsJSON.splice(foundSessionIndex, 1);

    writeMockFile(mockFile, sessionsJSON);

    res.status(200).json({
        status: 'success',
        data: sessionsJSON,
    });
});

module.exports = router;
