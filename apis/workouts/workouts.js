const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../../util/fileHelper");

const router = Router();

const mockFile = "workouts";

router.route("/").get(async (req, res, next) => {
  try {
    const workout = req.context.models.Workout;
    const workouts = await workout.find({}).populate("exercises");
    res.send({ success: true, data: workouts });
  } catch (e) {
    res.send({
      success: false,
      errors: e.stack,
    });
  }
});

// "userId": 1,
// "workoutId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/workout").post(async (req, res, next) => {
  try {
    const workout = req.context.models.Workout(req.body);
    await workout.save();
    res.send({ success: true, data: workout });
  } catch (e) {
    res.send({
      success: false,
      errors: e.stack,
    });
  }
  // const { name, type, isPublic, partsWorked, userId } = req.body;

  // const newworkoutData = {
  //     workoutId: uuidv4(),
  //     userId,
  //     name,
  //     type,
  //     isPublic,
  //     partsWorked,
  //     dateCreated: moment().format(),
  // };

  // const workoutsJSON = readMockFile(mockFile);

  // const newworkoutsData = [...workoutsJSON, newworkoutData];

  // writeMockFile(mockFile, newworkoutsData);

  // res.status(200).json({
  //     status: "success",
  //     data: newworkoutData,
  // });
});

router.route("/search").post(async (req, res, next) => {
  if (!req.body.search || req.body.search === null) {
    res.send({ success: false, errors: "Did not provide Search" });
  }

  console.log(req.body.search);

  const workoutsFound = await req.context.models.Workout.search(
    req.body.search
  );

  if (workoutsFound) {
    res.send({
      success: true,
      data: workoutsFound,
    });
  } else {
    res.send({
      success: true,
      data: "No workouts Found",
    });
  }
});

router.route("/workout/:workoutId").delete((req, res, next) => {
  const { workoutId } = req.params;

  const workoutsJSON = readMockFile(mockFile);

  const foundworkoutIndex = workoutsJSON.findIndex(
    (workout) => workout.workoutId === workoutId
  );

  //removeIndexOfFound
  workoutsJSON.splice(foundworkoutIndex, 1);

  writeMockFile(mockFile, workoutsJSON);

  res.status(200).json({
    status: "success",
    data: workoutsJSON,
  });
});

module.exports = router;
