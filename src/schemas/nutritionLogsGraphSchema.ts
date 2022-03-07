import resolverGenerator from "../utils/resolverGenerator";
import { NutritionLogTC } from "../apis/nutrition/nutritionLogs/nutritionLogsModel";
export const NutritionLogsGraph = resolverGenerator(
  "nutritionLog",
  NutritionLogTC,
  {
    queries: [
      { resolver: "nutritionLogSearch", key: "Search" },
      { resolver: "nutritionLogByDate", key: "ByDate" },
    ],
  }
);
