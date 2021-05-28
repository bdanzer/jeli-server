const {Router} = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const {ObjectId} = require("mongodb");
const {Query} = require("mongoose");

const router = Router();

router.route("/").get(async (req, res, next) => {
    const {dateFrom, dateTo} = req.query;

    try {
        const nutritionLog = req.context.models.NutritionLog;
        const nutritionLogs = await nutritionLog
            .findOne({
                //query today up to tonight
                createdAt: {
                    $gte: moment(dateFrom).endOf("day"),
                    $lt: moment(dateTo).startOf("day")
                }
            })
            .populate("meal1.data.product")
            .populate("meal2.data.product")
            .populate("meal3.data.product")
            .populate("snack1.data.product")
            .populate("snack2.data.product")
            .populate("snack3.data.product");

        if (!nutritionLogs) {
            res.send({
                success: false,
                reason: "NO_POSTS_FOUND",
                errors: null
            });
        }

        res.send({success: true, data: nutritionLogs});
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack
        });
    }
});

const mealTypes = ["meal1", "meal2", "meal3", "snack1", "snack2", "snack3"];

router.route("/recent-meals").get(async (req, res, next) => {
    const {mealType} = req.query;

    try {
        const query = req.body._id
            ? {_id: req.body._id}
            : {_id: new ObjectId()};

        // const result = await req.context.models.NutritionLog.find()
        //     .sort({ createdAt: -1 })
        //     .limit(3)
        //     .populate('meal1.data.product')
        //     .populate('meal2.data.product')
        //     .populate('meal3.data.product')
        //     .populate('snack1.data.product')
        //     .populate('snack2.data.product')
        //     .populate('snack3.data.product');

        const newQuery = new Query();
        let result;

        // if (mealType === 'ALL') {
        console.log("THIS IS FROM LOGS", req.user);
        result = await req.context.models.NutritionLog.find()
            .where("meal1.data.1")
            .exists(true)
            .sort({createdAt: -1})
            .limit(3)
            .populate("meal1.data.product")
            .populate("meal2.data.product")
            .populate("meal3.data.product")
            .populate("snack1.data.product")
            .populate("snack2.data.product")
            .populate("snack3.data.product");
        // }

        res.send({success: true, data: result});
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack
        });
    }
});

router.route("/log").post(async (req, res, next) => {
    let query;
    try {
        const query = req.body._id
            ? {_id: req.body._id}
            : {_id: new ObjectId()};
        const update = req.body;
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};

        const result = await req.context.models.NutritionLog.findOneAndUpdate(
            query,
            update,
            options
        )
            .populate("meal1.data.product")
            .populate("meal2.data.product")
            .populate("meal3.data.product")
            .populate("snack1.data.product")
            .populate("snack2.data.product")
            .populate("snack3.data.product");

        res.send({success: true, data: result});
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack
        });
    }
});

router.route("/search").post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({success: false, errors: "Did not provide Search"});
    }

    console.log(req.body.search);

    const nutritionLogsFound = await req.context.models.NutritionLog.search(
        req.body.search
    );

    if (nutritionLogsFound) {
        res.send({
            success: true,
            data: nutritionLogsFound
        });
    } else {
        res.send({
            success: true,
            data: "No NutritionLogs Found"
        });
    }
});

router.route("/log/:nutritionLogId").delete(async (req, res, next) => {
    const {nutritionLogId} = req.params;

    try {
        const nutritionLog = req.context.models.NutritionLog;
        const nutritionLogDeleted = await nutritionLog.deleteOne({
            _id: nutritionLogId
        });
        res.send({success: true, data: nutritionLogDeleted});
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack
        });
    }
});

module.exports = router;
