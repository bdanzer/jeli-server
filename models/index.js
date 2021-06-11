const mongoose = require("mongoose");

const User = require("../apis/users/userModel");
const Product = require("../apis/nutrition/products/productsModel");
const Recipe = require("../apis/nutrition/recipes/recipesModel");
const { Exercise } = require("../apis/exercises/exerciseModel");
const Workout = require("../apis/workouts/workoutsModel");
const { ExerciseLog } = require("../apis/logs/logsModel");
const { Program } = require("../apis/programs/programsModel");
const NutritionLog = require("../apis/nutrition/nutritionLogs/nutritionLogsModel");
const Goal = require("../apis/goals/goalsModel");
const Session = require("../apis/sessions/sessionsModel");
const Meal = require("../apis/nutrition/meals/mealsModel");

let dbConnect;
const dbName = "jeli";
const dbPass = "m9xzHnTZQN6YbLY8";

dbConnect = {
  dev: `mongodb://127.0.0.1:27017/${dbName}`,
  stag: `mongodb+srv://bdanzer:${dbPass}@jeli.zxqj5.mongodb.net/${dbName}`,
};

const env = "dev";

console.log(dbConnect);

const connectDb = () => mongoose.connect(dbConnect[env]);

const models = {
  User,
  Product,
  Recipe,
  Exercise,
  Workout,
  ExerciseLog,
  Program,
  NutritionLog,
  Goal,
  Session,
  Meal,
};

module.exports = { connectDb, models };
