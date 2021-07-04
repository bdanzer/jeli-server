const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    recipeCategory: { type: String, required: true },
    recipeCuisine: { type: String, required: true },
    recipePrepTime: { type: Number, required: true },
    recipePrepTimeUnits: { type: String, required: true },
    recipeCookTime: { type: Number, required: true },
    recipeCookTimeUnits: { type: String, required: true },
    recipeYields: { type: Number, required: true },
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
    recipeInstructions: { type: Array, required: true },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        modifier: {
          type: Number,
          required: true,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
