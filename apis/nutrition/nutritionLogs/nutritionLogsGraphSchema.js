const resolverGenerator = require("../../../utils/resolverGenerator");
const { NutritionLogTC } = require("./nutritionLogsModel");
const NutritionLogsGraph = resolverGenerator("nutritionLog", NutritionLogTC, {
  queries: [{ resolver: "nutritionLogSearch", key: "Search" }],
});

module.exports = { NutritionLogsGraph };
