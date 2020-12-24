const mongoose = require("mongoose");

// "userId": 1,
// "logId": 1,
// "name": "Barbell Bench",
// "description": "This is a test description for a workout",
// "logType": "lifting",
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

const logSchema = new mongoose.Schema(
    {
        logType: { type: String, required: true },
        exerciseData: [
            {
                reps: {
                    type: Number,
                    required: true,
                },
                weight: {
                    type: Number,
                    required: true,
                },
                metric: {
                    type: String,
                    required: true,
                },
            },
        ],
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

logSchema.statics.search = async function (logName) {
    const log = await this.find({
        name: {
            $regex: new RegExp("^" + logName.toLowerCase(), "i"),
        },
    });

    return log;
};

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
