const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "logs";

router.route("/").get(async (req, res, next) => {
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

// "userId": 1,
// "logId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/log").post(async (req, res, next) => {
    try {
        const log = req.context.models.Log(req.body);
        await log.save();
        res.send({ success: true, data: log });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
    // const { name, type, isPublic, partsWorked, userId } = req.body;

    // const newLogData = {
    //     logId: uuidv4(),
    //     userId,
    //     name,
    //     type,
    //     isPublic,
    //     partsWorked,
    //     dateCreated: moment().format(),
    // };

    // const logsJSON = readMockFile(mockFile);

    // const newLogsData = [...logsJSON, newLogData];

    // writeMockFile(mockFile, newLogsData);

    // res.status(200).json({
    //     status: "success",
    //     data: newLogData,
    // });
});

router.route("/search").post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: "Did not provide Search" });
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
            data: "No Logs Found",
        });
    }
});

router.route("/log/:logId").delete((req, res, next) => {
    const { logId } = req.params;

    const logsJSON = readMockFile(mockFile);

    const foundLogIndex = logsJSON.findIndex((log) => log.logId === logId);

    //removeIndexOfFound
    logsJSON.splice(foundLogIndex, 1);

    writeMockFile(mockFile, logsJSON);

    res.status(200).json({
        status: "success",
        data: logsJSON,
    });
});

module.exports = router;
