const mongoose = require("mongoose");

// "userId": 1,
// "sessionId": 1,
// "name": "Barbell Bench",
// "description": "This is a test description for a workout",
// "sessionType": "lifting",
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

const sessionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sessionType: { type: String, required: true },
        equipmentType: { type: String, required: true },
        mechanicsType: { type: String, required: true },
        isPublic: { type: Boolean, required: true },
        muscleGroups: { type: Array, required: true },
        muscles: { type: Array, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

sessionSchema.statics.search = async function (sessionName) {
    const session = await this.find({
        name: {
            $regex: new RegExp("^" + sessionName.toLowerCase(), "i"),
        },
    });

    return session;
};

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
