const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
    {
        name: { type: String },
        loggedTime: {
            seconds: { type: Number },
            minutes: { type: Number },
            hours: { type: Number },
        },
        logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Log' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

sessionSchema.statics.search = async function (sessionName) {
    const session = await this.find({
        name: {
            $regex: new RegExp('^' + sessionName.toLowerCase(), 'i'),
        },
    });

    return session;
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
