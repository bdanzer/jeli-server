export default `
  type Query {
    getUser: User!
    getNutritionLog(addDays: Int!): NutritionLog!
    getNutritionLogs: [NutritionLog!]!
    searchProducts(textSearch: String!): [Product!]
    getMeals: [Meal!]!
  }
`;
