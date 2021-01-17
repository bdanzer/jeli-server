const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/user');

module.exports = () => {
    // Allowing passport to serialize and deserialize users into sessions
    // serialize the user.id to save in the cookie session
    // so the browser will remember the user when login
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserialize the cookieUserId to user in the database
    passport.deserializeUser((id, done) => {
        console.log('id', id);
        User.findById(id)
            .then((user) => {
                done(null, user.id);
            })
            .catch((e) => {
                // done(new Error(e.stack));
                done(null, false);
            });
    });

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    const cb = async function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        console.log('GOOGLE PROFILE', profile);
        console.log('worked', accessToken, refreshToken);
        const currentUser = await User.findOne({
            googleId: profile.id,
        });
        // create new user if the database doesn't have this user
        if (!currentUser) {
            const newUser = await new User({
                googleId: profile.id,
                displayName: profile.displayName,
                setUpComplete: false,
            }).save();
            if (newUser) {
                done(null, newUser);
            }
        }
        done(null, currentUser);
    };

    passport.use(
        new GoogleStrategy(
            {
                clientID:
                    '805855571748-e3g4ma7kmf6ss5qt9oui2hva1ubkj0r0.apps.googleusercontent.com',
                clientSecret: 'bxBHJj-jpxbEXzce8fwqLHqc',
                callbackURL: 'http://localhost:3003/api/auth/google/callback',
            },
            cb
        )
    );
};
