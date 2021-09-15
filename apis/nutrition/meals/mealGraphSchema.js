const resolverGenerator = require("../../../utils/resolverGenerator");
const { MealTC } = require("./mealsModel");
const MealGraph = resolverGenerator("meal", MealTC, {
  queries: [{ resolver: "mealSearch", key: "Search" }],
});

module.exports = { MealGraph };
