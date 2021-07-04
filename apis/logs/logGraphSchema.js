const resolverGenerator = require("../../utils/resolverGenerator");
const { ExerciseLogDTC } = require("./logsModel");
const ExerciseLogGraph = resolverGenerator("exerciseLog", ExerciseLogDTC, {
  queries: [
    { resolver: "exerciseLogsManyByExerciseId", key: "ManyByExerciseId" },
  ],
  mutations: [],
});

module.exports = { ExerciseLogGraph };
