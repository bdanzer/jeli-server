const mongoose = require("mongoose");

// startingDate: 'YYYY-MM-DD',
// projectedEndDate: 'YYYY-MM-DD',
// goalCategory: 'nutrition',
// goalMeta: {
//     goalType: 'bodyFat',
//     targetBodyFat: 0.13,
//     currentBodyFat: 0.26,
//     targetWeight: 150,
//     startingWeight: 185,
//     ibs2LosePerWeek: 2,
// },
// weeksToCompletion: 'Here',

//need to use discriminators to change different categories

const goalSchema = new mongoose.Schema(
    {
        startingDate: {type: String, required: true},
        projectedEndDate: {type: String},
        goalCategory: {type: String, required: true},
        goalMeta: {type: Object, required: true},
        weeksToCompletion: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    },
    {timestamps: true}
);

goalSchema.statics.search = async function (goalName) {
    const goal = await this.find({
        name: {
            $regex: new RegExp("^" + goalName.toLowerCase(), "i")
        }
    });

    return goal;
};

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
