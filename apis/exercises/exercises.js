const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "exercises";

router.route("/").get(async (req, res, next) => {
    try {
        const exercise = req.context.models.Exercise;
        const exercises = await exercise.find({});
        res.send({ success: true, data: exercises });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

// "userId": 1,
// "exerciseId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/exercise").post(async (req, res, next) => {
    try {
        const exercise = req.context.models.Exercise(req.body);
        await exercise.save();
        res.send({ success: true, data: exercise });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
    // const { name, type, isPublic, partsWorked, userId } = req.body;

    // const newExerciseData = {
    //     exerciseId: uuidv4(),
    //     userId,
    //     name,
    //     type,
    //     isPublic,
    //     partsWorked,
    //     dateCreated: moment().format(),
    // };

    // const exercisesJSON = readMockFile(mockFile);

    // const newExercisesData = [...exercisesJSON, newExerciseData];

    // writeMockFile(mockFile, newExercisesData);

    // res.status(200).json({
    //     status: "success",
    //     data: newExerciseData,
    // });
});

router.route("/search").post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: "Did not provide Search" });
    }

    console.log(req.body.search);

    const exercisesFound = await req.context.models.Exercise.search(
        req.body.search
    );

    if (exercisesFound) {
        res.send({
            success: true,
            data: exercisesFound,
        });
    } else {
        res.send({
            success: true,
            data: "No Exercises Found",
        });
    }
});

router.route("/exercise/:exerciseId").delete(async (req, res, next) => {
    const { exerciseId } = req.params;

    try {
        const exercise = req.context.models.Exercise;
        const exerciseDeleted = await exercise.deleteOne({ _id: exerciseId });
        res.send({ success: true, data: exerciseDeleted });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;
