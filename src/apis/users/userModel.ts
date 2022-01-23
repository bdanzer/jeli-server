import { composeWithMongoose } from "graphql-compose-mongoose";
import { Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";
import moment from 'moment'
import jwt from 'jsonwebtoken'
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
  name: "getUser",
  kind: "query",
  type: UserTC,
  resolve: async ({ source, args, context }) => {
    const { googleClient, headers, setCookies, isUserAuthd } = context;

    console.log('isUSerAuthd in getUSer', isUserAuthd)

    const userData = (await User.findOne({ email: isUserAuthd?.data?.email })) || null;

    if (userData) {
      setCookies.push({
        name: "userAuth",
        value: jwt.sign({
          data: userData
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
        options: {
          httpOnly: true,
          maxAge: 3600,
          path: "/",
          sameSite: 'none',
          secure: true
        }
      });
      return userData
    }

    throw new Error('No User Account Exist')
  },
});

UserTC.addResolver({
  name: "userSetup",
  kind: "mutation",
  args: {
    role: "String!",
    weight: "Float!",
    height: "Float!",
    bodyFat: "Float",
    userActivity: "String",
    sex: "String!",
    dateOfBirth: "String!",
    timezone: "String!",
    preferredTheme: "String",
    preferredMetric: "String"
  },
  type: UserTC,
  resolve: async ({ source, args, context }) => {
    const { role, weight, height, bodyFat, userActivity, sex, dateOfBirth, timezone, preferredTheme, preferredMetric } = args;
    const { googleClient, headers, setCookies, isUserAuthd } = context;
    const userData = (await User.findOneAndUpdate({ email: isUserAuthd?.data?.email }, {
      role,
      setUpComplete: true,
      fitnessInfo: {
        weight,
        height,
        bodyFat,
        userActivity,
        sex
      },
      userSettings: {
        dateOfBirth,
        timezone,
        preferredTheme: "default",
        preferredMetric,
      },
    }, { new: true })) || null;

    if (userData) {
      setCookies.push({
        name: "userAuth",
        value: jwt.sign({
          data: userData
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
        options: {
          // expires: moment().add(1, 'hours').format(),
          httpOnly: true,
          maxAge: 3600,
          path: "/",
          sameSite: 'none',
          secure: true
        }
      });
      return userData
    }

    throw new Error('No User Account Exists')
  },
});

UserTC.addResolver({
  name: "userLogin",
  kind: "mutation",
  args: { googleToken: "String" },
  type: UserTC,
  resolve: async ({ source, args, context }) => {
    const { googleToken } = args;
    console.log('google TOken given', googleToken)
    const { googleClient, headers, setCookies } = context;
    // console.log(headers, process.env)
    const ticket = await googleClient.verifyIdToken({ idToken: googleToken, audience: process.env.GOOGLE_CLIENT_ID })
    const payload = ticket.getPayload()
    const userId = payload['sub']
    const email = payload['email']
    console.log('userId', userId, email)

    try {
      const userData = (await User.findOne({
        where: { email }
      })) || null;

      if (userData) {
        setCookies.push({
          name: "userAuth",
          value: jwt.sign({
            data: userData
          }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }),
          options: {
            // expires: moment().add(1, 'hours').format(),
            httpOnly: true,
            maxAge: 3600,
            path: "/",
            sameSite: 'none',
            secure: true
          }
        });
        return userData
      }
  } catch (e) {
    throw new Error('No User Account Exist Yet') 
  }

    throw new Error('No User Account Exist Yet')
  }
});
