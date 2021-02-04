const mongoose = require('mongoose');

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
        frontMuscles: { type: Array, required: true },
        backMuscles: { type: Array, required: true },
        instructions: { type: Array },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

exerciseSchema.statics.search = async function (exerciseName) {
    const exercise = await this.find({
        exerciseName: {
            $regex: new RegExp('^' + exerciseName.toLowerCase(), 'i'),
        },
    });

    return exercise;
};

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
