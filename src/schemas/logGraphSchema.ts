import resolverGenerator from "../utils/resolverGenerator";
import { ExerciseLogDTC } from "../apis/logs/logsModel";
export const ExerciseLogGraph = resolverGenerator("exerciseLog", ExerciseLogDTC, {
  queries: [
    { resolver: "exerciseLogsManyByExerciseId", key: "ManyByExerciseId" },
  ],
  mutations: [],
});
