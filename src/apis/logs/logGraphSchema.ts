import resolverGenerator from "../../utils/resolverGenerator";
import { ExerciseLogDTC } from "./logsModel";
export const ExerciseLogGraph = resolverGenerator("exerciseLog", ExerciseLogDTC, {
  queries: [
    { resolver: "exerciseLogsManyByExerciseId", key: "ManyByExerciseId" },
  ],
  mutations: [],
});
