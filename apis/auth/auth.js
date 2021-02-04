const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
const passport = require('passport');

const router = Router();

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
    '/google/callback',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        failureRedirect: '/errors',
        session: true,
    }),
    function (req, res) {
        if (req.user) {
            console.log(req.user);
            res.cookie('token', req.user);
            // console.log('session', req.session);
            return res.redirect('http://localhost:8080/dashboard');
        } else {
            console.log('error');
            return res.redirect('http://localhost:8080/errors');
        }
        // res.redirect('http://localhost:8080');
        // res.status(200);
    }
);

// When logout, redirect to client
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:8080');
});

router.route('/token').get(async (req, res, next) => {
    // console.log('session', req.session);

    const userData = (await req.context.models.User.findById(req.user)) || null;

    res.status(200).json({
        status: 'success',
        data: userData,
    });
});

module.exports = router;
