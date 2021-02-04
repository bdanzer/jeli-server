const mongoose = require('mongoose');

const User = require('./user');
const Product = require('./products');
const Recipe = require('./recipes');
const Exercise = require('./exercise');
const Workout = require('./workouts');
const Log = require('./logs');
const Program = require('./programs');
const NutritionLog = require('./nutritionLogs');
const Goal = require('./goals');
const Session = require('./sessions');
const Meal = require('./meals');

let dbConnect;
const dbName = 'jeli';
const dbPass = 'm9xzHnTZQN6YbLY8';

dbConnect = {
    dev: `mongodb://127.0.0.1:27017/${dbName}`,
    stag: `mongodb+srv://bdanzer:${dbPass}@jeli.zxqj5.mongodb.net/${dbName}`,
};

const env = 'dev';

console.log(dbConnect);

const connectDb = () => mongoose.connect(dbConnect[env]);

const models = {
    User,
    Product,
    Recipe,
    Exercise,
    Workout,
    Log,
    Program,
    NutritionLog,
    Goal,
    Session,
    Meal,
};

module.exports = { connectDb, models };
