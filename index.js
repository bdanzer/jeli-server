// dot env configuration
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// load env
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { models, connectDb } = require('./models');

const exercises = require('./apis/exercises/exercises');
// const goals = require('./apis/goals/goals');
const logs = require('./apis/logs/logs');
const programs = require('./apis/sessions/sessions');
const sessions = require('./apis/sessions/sessions');
const users = require('./apis/users/users');
const workouts = require('./apis/workouts/workouts');
const products = require('./apis/nutrition/products/products');
const nutritionLog = require('./apis/nutrition/nutritionLogs/nutritionLogs');
const recipes = require('./apis/nutrition/recipes/recipes');
const meals = require('./apis/nutrition/meals/meals');
const auth = require('./apis/auth/auth');
const goals = require('./apis/goals/goals');
const google = require('./apis/auth/google');
const importNutrition = require('./apis/nutrition/import/import');
const paypal = require('./apis/payments/paypal/paypal');
const { ExerciseLog } = require('./models/logs');
const IPNController = require('./client/IPN');

require('./services/aws');

// Start express app
const app = express();

app.use(
    cookieSession({
        name: 'session',
        keys: ['thisappisawesome'],
        maxAge: 24 * 60 * 60 * 100,
    })
);

// init cookie parser
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:8080', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // allow session cookie from browser to pass through
    })
);
app.use(express.json({ limit: '10kb' }));
google();

app.use(passport.initialize());
app.use(passport.session());

// var Account = require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: 'user has not been authenticated',
        });
    } else {
        next();
    }
};

app.use(async (req, res, next) => {
    console.log(models.user);
    req.context = {
        models,
    };
    next();
});

app.use(async (req, res, next) => {
    await setTimeout(() => next(), 1000);
    // next();
});

async function hello() {
    const log = await new ExerciseLog({
        exerciseLog: {
            reps: 1,
            weight: 150,
        },
        exerciseInfo: '5ff694dc22b4521b7cb81875',
    }).save();

    console.log(log, '=======LOG=======');
}
hello();

// 3) ROUTES
app.use('/api/exercises', authCheck, exercises);
// app.use("/api/goals", goals);
app.use('/api/logs', authCheck, logs);
app.use('/api/programs', programs);
app.use('/api/sessions', authCheck, sessions);
app.use('/api/users', authCheck, users);
app.use('/api/nutrition/logs', authCheck, nutritionLog);
app.use('/api/products', authCheck, products);
app.use('/api/recipes', authCheck, recipes);
app.use('/api/meals', authCheck, meals);
app.use('/api/workouts', authCheck, workouts);
app.use('/api/auth', auth);
app.use('/api/goals', authCheck, goals);
app.use('/api/nutrition/import', importNutrition);
app.use('/api/payments/paypal', paypal);
app.use('/ipn', IPNController.index);

app.all('*', (req, res, next) => {
    res.status(500).send(`Can't find ${req.originalUrl} on this server!`);
});

connectDb().then(async () => {
    try {
    } catch (e) {
        console.log(e.stack);
    }
});

const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
