const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "goals";

router.route("/").get((req, res, next) => {
    const goals = readMockFile(mockFile);

    res.status(200).json({
        status: "success",
        data: goals,
    });
});

// "userId": 1,
// "exerciseId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/goal").post((req, res, next) => {
    const { name, type, isPublic, partsWorked, userId } = req.body;

    const newGoalData = {
        exerciseId: uuidv4(),
        userId,
        name,
        type,
        isPublic,
        partsWorked,
        dateCreated: moment().format(),
    };

    const goalsJSON = readMockFile(mockFile);

    const newGoalsData = [...goalsJSON, newGoalData];

    writeMockFile(mockFile, newGoalsData);

    res.status(200).json({
        status: "success",
        data: newGoalData,
    });
});

router.route("/goal/:goalId").delete((req, res, next) => {
    const { exerciseId } = req.params;

    const goalsJSON = readMockFile(mockFile);

    const foundExerciseIndex = goalsJSON.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
    );

    //removeIndexOfFound
    goalsJSON.splice(foundExerciseIndex, 1);

    writeMockFile(mockFile, goalsJSON);

    res.status(200).json({
        status: "success",
        data: goalsJSON,
    });
});

module.exports = router;
