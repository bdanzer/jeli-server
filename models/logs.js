const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
    {
        logType: { type: String, required: true },
        exerciseLog: [
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
                    // required: true,
                },
            },
        ],
        exerciseInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
            required: true,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        exerciseMeta: {
            programs: {
                type: mongoose.Schema.Types.Mixed,
            },
            // programs: {
            //     type: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
            // },
        },
    },
    { timestamps: true }
);

logSchema.statics.search = async function (logName) {
    const log = await this.find({
        name: {
            $regex: new RegExp('^' + logName.toLowerCase(), 'i'),
        },
    });

    return log;
};

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
