const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");

const router = Router();

router.route("/").get(async (req, res, next) => {
    try {
        const nutritionLog = req.context.models.NutritionLog;
        const nutritionLogs = await nutritionLog.find({ //query today up to tonight
            createdAt: {
                $gte: new Date(2020, 11, 29), 
                $lt: new Date(2020, 11, 31)
            }
        }).populate("meal1.data");
        res.send({ success: true, data: nutritionLogs });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route("/log").post(async (req, res, next) => {
    try {
        const nutritionLog = req.context.models.NutritionLog(req.body);
        await nutritionLog.save();
        res.send({ success: true, data: nutritionLog });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route("/search").post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: "Did not provide Search" });
    }

    console.log(req.body.search);

    const nutritionLogsFound = await req.context.models.NutritionLog.search(
        req.body.search
    );

    if (nutritionLogsFound) {
        res.send({
            success: true,
            data: nutritionLogsFound,
        });
    } else {
        res.send({
            success: true,
            data: "No NutritionLogs Found",
        });
    }
});

router.route("/log/:nutritionLogId").delete(async (req, res, next) => {
    const { nutritionLogId } = req.params;

    try {
        const nutritionLog = req.context.models.NutritionLog;
        const nutritionLogDeleted = await nutritionLog.deleteOne({ _id: nutritionLogId });
        res.send({ success: true, data: nutritionLogDeleted });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;
