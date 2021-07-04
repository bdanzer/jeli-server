const mongoose = require("mongoose");
// const timestamps = require("mongoose-timestamp");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const { WorkoutTC } = require("../workouts/workoutsModel");

const programSchema = new mongoose.Schema(
  {
    programName: { type: String, required: true },
    programDescription: { type: String, required: true },
    programType: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    isPaid: { type: Boolean },
    amount: { type: Number },
    durationOfTraining: { type: Number, required: true }, //days
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

programSchema.statics.search = async function (programName) {
  const program = await this.find({
    name: {
      $regex: new RegExp("^" + programName.toLowerCase(), "i"),
    },
  });

  return program;
};

const Program = mongoose.model("Program", programSchema);
const ProgramTC = composeWithMongoose(Program);
ProgramTC.addRelation("workouts", {
  resolver: () => WorkoutTC.getResolver("dataLoaderMany"),
  prepareArgs: {
    // resolver `findByIds` has `_ids` arg, let provide value to it
    _ids: (source) => source.workouts,
  },
  projection: { workouts: 1 }, // point fields in source object, which should be fetched from DB
});

module.exports = { ProgramTC, Program };
