import resolverGenerator from "../../../utils/resolverGenerator";
import { NutritionLogTC } from "./nutritionLogsModel";
export const NutritionLogsGraph = resolverGenerator("nutritionLog", NutritionLogTC, {
   queries: [{ resolver: "nutritionLogSearch", key: "Search" }, { resolver: "nutritionLogByDate", key: "ByDate" }],
});

