const {
  composeWithMongooseDiscriminators,
} = require("graphql-compose-mongoose");
const mongoose = require("mongoose");
const { ExerciseTC } = require("../exercises/exerciseModel");

const baseOptions = {
  discriminatorKey: "logType",
  timestamps: true,
  // collection: 'Log',
};
const logBase = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  baseOptions
);

const Log = mongoose.model("Log", logBase);

const ExerciseLog = Log.discriminator(
  "exercise",
  new mongoose.Schema({
    exerciseLog: [
      {
        _id: false,
        reps: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
    exerciseInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    exerciseMeta: {}, //need to figure out
  })
);

const LogDTC = composeWithMongooseDiscriminators(Log);
const ExerciseLogDTC = LogDTC.discriminator(ExerciseLog);

ExerciseLogDTC.addRelation("exerciseInfo", {
  resolver: () => ExerciseTC.getResolver("findById"),
  prepareArgs: {
    // resolver `findByIds` has `_ids` arg, let provide value to it
    _id: (source) => {
      console.log("GET ID", source.exerciseInfo);
      return source.exerciseInfo;
    },
  },
  projection: { exerciseInfo: 1 }, // point fields in source object, which should be fetched from DB
});

ExerciseLogDTC.addResolver({
  name: "exerciseLogsManyByExerciseId",
  kind: "query",
  args: { _id: "MongoID!" },
  type: [ExerciseLogDTC],
  resolve: async ({ source, args }) => {
    const exerciseLogs = await ExerciseLog.find({
      exerciseInfo: new mongoose.Types.ObjectId(args._id),
    }).exec();

    console.log("exerciseLogs", exerciseLogs);

    if (!exerciseLogs) throw new Error("found nothing");
    return exerciseLogs;
  },
});

module.exports = { ExerciseLog, ExerciseLogDTC, LogDTC };
