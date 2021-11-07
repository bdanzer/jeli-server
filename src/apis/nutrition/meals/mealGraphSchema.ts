import resolverGenerator from "../../../utils/resolverGenerator";
import { MealTC } from "./mealsModel";
export const MealGraph = resolverGenerator("meal", MealTC, {
  queries: [{ resolver: "mealSearch", key: "Search" }],
});
