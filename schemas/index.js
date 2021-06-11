const { schemaComposer } = require("graphql-compose");
const {
  ProgramQuery,
  ProgramMutation,
} = require("../apis/programs/programsGraphSchema");
const {
  ExerciseQuery,
  ExerciseMutation,
} = require("../apis/exercises/exerciseGraphSchema");

// STEP 3: Add needed CRUD Program operations to the GraphQL Schema
// via graphql-compose it will be much much easier, with less typing
schemaComposer.Query.addFields({
  ...ProgramQuery,
  ...ExerciseQuery,
});

schemaComposer.Mutation.addFields({
  ...ProgramMutation,
  ...ExerciseMutation,
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;
