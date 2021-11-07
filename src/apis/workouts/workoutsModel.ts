import { composeWithMongoose } from "graphql-compose-mongoose";
import { Schema, model } from "mongoose";

// "userId": 1,
// "workoutId": 1,
// "name": "Barbell Bench",
// "description": "This is a test description for a workout",
// "workoutType": "lifting",
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

//workout types
//warm up, Weight Lifting, Cardio

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    workoutType: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    restPeriods: { type: Number, required: true },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

workoutSchema.statics.search = async function (workoutName) {
  const workout = await this.find({
    name: {
      $regex: new RegExp("^" + workoutName.toLowerCase(), "i"),
    },
  });

  return workout;
};

export const workout = model("Workout", workoutSchema);
export const WorkoutTC = composeWithMongoose(workout);
