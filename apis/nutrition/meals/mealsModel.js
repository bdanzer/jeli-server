const { composeWithMongoose } = require("graphql-compose-mongoose");
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    mealName: {
      type: String,
    },
    meal: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        modifier: {
          type: Number,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

mealSchema.statics.search = async function (mealName) {
  const meal = await this.find({
    mealName: {
      $regex: ".*" + mealName + ".*",
    },
  }).populate("meal.product");

  return meal;
};

const Meal = mongoose.model("Meal", mealSchema);

const MealTC = composeWithMongoose(Meal);

module.exports = Meal;
