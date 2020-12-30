const mongoose = require("mongoose");

// "userId": 1,
// "exerciseId": 1,
// "name": "Barbell Bench",
// "description": "This is a test description for a workout",
// "exerciseType": "lifting",
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

const exerciseSchema = new mongoose.Schema(
    {
        exerciseName: { type: String, required: true },
        exerciseDescription: { type: String, required: true },
        exerciseType: { type: String, required: true },
        equipmentType: { type: String, required: true },
        mechanicType: { type: String, required: true },
        isExercisePublic: { type: Boolean, required: true },
        muscleGroups: { type: Array, required: true },
        muscles: { type: Array, required: true },
        instructions: { type: Array },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

exerciseSchema.statics.search = async function (exerciseName) {
    const exercise = await this.find({
        name: {
            $regex: new RegExp("^" + exerciseName.toLowerCase(), "i"),
        },
    });

    return exercise;
};

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
