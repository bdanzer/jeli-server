const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: { type: String, required: true },
    exerciseDescription: { type: String, required: true },
    exerciseType: {
      type: String,
      required: true,
      enum: ["weightLifting", "cardio"],
    },
    equipmentType: {
      type: String,
      required: true,
      enum: ["body", "dumbbell"],
    },
    mechanicType: {
      type: String,
      required: true,
      enum: ["isometric", "compound"],
    },
    isExercisePublic: { type: Boolean, required: true },
    muscleGroups: { type: Array, required: true },
    muscles: { type: Array, required: true },
    frontMuscles: { type: Array, required: true },
    backMuscles: { type: Array, required: true },
    instructions: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
const ExerciseTC = composeWithMongoose(Exercise);

ExerciseTC.addResolver({
  name: "exerciseSearch",
  kind: "query",
  args: { exerciseName: "String" },
  type: [ExerciseTC],
  resolve: async ({ source, args }) => {
    const exercise = await Exercise.find({
      exerciseName: {
        $regex: new RegExp("^" + args.exerciseName.toLowerCase(), "i"),
      },
    }).exec();

    if (!exercise) throw new Error("found nothing");
    return exercise;
  },
});

module.exports = { ExerciseTC, Exercise };
