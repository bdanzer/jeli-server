import { schemaComposer } from "graphql-compose";
import { ProgramQuery, ProgramMutation } from "../apis/programs/programsGraphSchema";
import { ExerciseQuery, ExerciseMutation } from "../apis/exercises/exerciseGraphSchema";
import { ExerciseLogGraph } from "../apis/logs/logGraphSchema";
import { MealGraph } from "../apis/nutrition/meals/mealGraphSchema";
import { ProductGraph } from "../apis/nutrition/products/productsGraphSchema";
import { NutritionLogsGraph } from "../apis/nutrition/nutritionLogs/nutritionLogsGraphSchema";
import { UserGraph } from '../apis/users/usersGraphSchema'
import typeDefs from "../graphql/type-defs";
import * as queries from "../graphql/resolvers/queries";
import * as mutations from "../graphql/resolvers/mutations";

schemaComposer.Query.addFields({
  ...ProgramQuery,
  ...ExerciseQuery,
  ...ExerciseLogGraph.queryResolvers,
  ...MealGraph.queryResolvers,
  ...ProductGraph.queryResolvers,
  ...NutritionLogsGraph.queryResolvers,
  ...UserGraph.queryResolvers
});

schemaComposer.Mutation.addFields({
  ...ProgramMutation,
  ...ExerciseMutation,
  ...ExerciseLogGraph.mutationResolvers,
  ...MealGraph.mutationResolvers,
  ...ProductGraph.mutationResolvers,
  ...NutritionLogsGraph.mutationResolvers,
  ...UserGraph.mutationResolvers
});

schemaComposer.addTypeDefs(typeDefs);
const resolvers = {
  Mutation: mutations,
  Query: queries,
};
schemaComposer.addResolveMethods(resolvers);

const graphqlSchema = schemaComposer.buildSchema();

export default graphqlSchema
