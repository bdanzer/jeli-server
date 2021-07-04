const { schemaComposer } = require("graphql-compose");
const {
  ProgramQuery,
  ProgramMutation,
} = require("../apis/programs/programsGraphSchema");
const {
  ExerciseQuery,
  ExerciseMutation,
} = require("../apis/exercises/exerciseGraphSchema");
const { ExerciseLogGraph } = require("../apis/logs/logGraphSchema");

// STEP 3: Add needed CRUD Program operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  ...ProgramQuery,
  ...ExerciseQuery,
  ...ExerciseLogGraph.queryResolvers,
});

schemaComposer.Mutation.addFields({
  ...ProgramMutation,
  ...ExerciseMutation,
  ...ExerciseLogGraph.mutationResolvers,
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
