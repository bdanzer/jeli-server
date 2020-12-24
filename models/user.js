const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        locale: {
            type: String,
            default: "US",
        },
        fitnessInfo: {
            weight: {
                metric: {
                    type: String,
                },
                value: {
                    type: Number,
                },
            },
            height: {
                metric: {
                    type: String,
                },
                feet: {
                    type: Number,
                },
                inches: {
                    type: Number,
                },
            },
        },
        userSettings: {
            goalView: {
                type: String,
            },
            preferredPrimaryColor: {
                type: String,
            },
            preferredSecondaryColor: {
                type: String,
            },
            preferredTheme: {
                type: String,
            },
            preferredMetric: {
                type: String,
            },
            turnOnInspiringQuotes: {
                type: Boolean,
            },
        },
        betaUser: {
            type: Boolean,
            required: true,
        },
        tokens: {
            type: Array,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

userSchema.pre("remove", function (next) {
    this.model("Message").deleteMany({ user: this._id }, next);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
