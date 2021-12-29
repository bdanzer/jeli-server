import resolverGenerator from "../utils/resolverGenerator";
import { MealTC } from "../apis/nutrition/meals/mealsModel";
export const MealGraph = resolverGenerator("meal", MealTC, {
  queries: [{ resolver: "mealSearch", key: "Search" }],
});
