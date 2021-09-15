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
const { MealGraph } = require("../apis/nutrition/meals/mealGraphSchema");
const {
  ProductGraph,
} = require("../apis/nutrition/products/productsGraphSchema");
const {
  NutritionLogsGraph,
} = require("../apis/nutrition/nutritionLogs/nutritionLogsGraphSchema");
const { gql } = require("apollo-server-express");

schemaComposer.Query.addFields({
  ...ProgramQuery,
  ...ExerciseQuery,
  ...ExerciseLogGraph.queryResolvers,
  ...MealGraph.queryResolvers,
  ...ProductGraph.queryResolvers,
  ...NutritionLogsGraph.queryResolvers,
});

schemaComposer.Mutation.addFields({
  ...ProgramMutation,
  ...ExerciseMutation,
  ...ExerciseLogGraph.mutationResolvers,
  ...MealGraph.mutationResolvers,
  ...ProductGraph.mutationResolvers,
  ...NutritionLogsGraph.mutationResolvers,
});

const graphqlSchema = schemaComposer.buildSchema();

const typeDefs = gql`
  type Fields {
    calories: Float!
    protein: Float!
    sugar: Float!
    sodium: Float!
    carbs: Float!
    totalFat: Float!
    addedSugar: Float!
    cholesterol: Float!
  }
  type NutritionItem {
    nixBrandId: String
    brandName: String
    brandItemName: String
    foodName: String
    nutritionInfo: Fields!
  }
  type Query {
    full_nutrients: NutritionItem
  }
  type Mutation {
    searchNutritionBrand(query: String): [NutritionItem]
    searchNutritionByNixId(nixId: String): [NutritionItem]
    searchNutritionByUPC(upc: String): [NutritionItem]
    # getItem(id: String):
  }
`;
module.exports.graphqlSchema = graphqlSchema;
module.exports.typeDefs = typeDefs;
