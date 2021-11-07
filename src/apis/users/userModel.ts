import { composeWithMongoose } from "graphql-compose-mongoose";
import { Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    setUpComplete: {
      type: Boolean,
    },
    displayName: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
    },
    fitnessInfo: {
      //stored as kilograms
      weight: {
        type: Number,
      },
      //stored as centimeters
      height: {
        type: Number,
      },
      bodyFat: {
        type: Number,
      },
      userActivity: {
        type: String,
        //turn to enum
      },
      sex: {
        type: String,
      },
    },
    userSettings: {
      preferredTheme: {
        type: String,
      },
      preferredMetric: {
        type: String,
      },
      turnOnInspiringQuotes: {
        type: Boolean,
      },
      timezone: {
        type: String,
      },
      locale: {
        type: String,
        default: "US",
      },
      dateOfBirth: {
        type: Date,
      },
    },
    betaUser: {
      type: Boolean,
    },
    tokens: {
      type: Array,
    },
    activeSession: {
      inProgress: {
        type: Boolean,
        default: false,
      },
      exercises: [
        {
          exercise: {
            type: Schema.Types.ObjectId,
            ref: "Exercise",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    _hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  compare(candidatePassword, this.password, function (err, isMatch) {
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

export const User = model("User", userSchema);
export const UserTC = composeWithMongoose(User, {
  operators: true,
});

UserTC.addResolver({
  name: "userLogin",
  kind: "mutation",
  args: { dateFrom: "String", dateTo: "String" },
  type: UserTC,
  resolve: async ({ source, args, context }) => {
    console.log('dates', args.dateFrom, args.dateTo);
    const userData = (await req.context.models.User.findById(req.user)) || null;

    if (userData) {
      return {
        status: "success",
        data: userData,
      };
    }

    return {
      status: "failed",
      data: null,
    };
  },
});
