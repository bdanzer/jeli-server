import { schemaComposer } from "graphql-compose";
import { ProgramQuery, ProgramMutation } from "./programsGraphSchema";
import { ExerciseQuery, ExerciseMutation } from "./exerciseGraphSchema";
import { ExerciseLogGraph } from "./logGraphSchema";
import { MealGraph } from "./mealGraphSchema";
import { ProductGraph } from "./productsGraphSchema";
import { NutritionLogsGraph } from "./nutritionLogsGraphSchema";
import { UserGraph } from './usersGraphSchema'
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
