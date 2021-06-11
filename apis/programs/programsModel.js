const mongoose = require("mongoose");
// const timestamps = require("mongoose-timestamp");
const { composeWithMongoose } = require("graphql-compose-mongoose");

// "userId": 1,
// "programId": 1,
// "name": "Barbell Bench",
// "description": "This is a test description for a workout",
// "programType": "lifting",
// "equipmentType": "bar",
// "mechanicsType": "Compound",
// "isPublic": true,
// "muscleGroups": [
//     "chest",
//     "arms"
// ],
// "muscles": [
//     "pecs",
//     "triceps"
// ]

// "userId": 1,
// "programId": 1,
// "programName": "The Grind",
// "startDate": "2020-07-08",
// "endDate": "2020-09-08",
// "workoutsCompleted": 24,
// "daysOfTrainingPerWeek": 3,
// "weeksOfTraining": 8, //in weeks
// "durationOfTraining": {
//     "length": 8,
//     "type": "week"
// },
// "workoutIds": [1, 3, 4, 6],
// "flexible": true, //potentially add program strict
// // marathon: 1, //years
// "relay": 2, //months
// "sprint": 1, // week
// "isMarathon": false,
// "isRelay": true,
// "isSprint": false,
// "isPaid": false,
// "isPublic": false

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
        ref: "User",
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

module.exports = { ProgramTC, Program };
