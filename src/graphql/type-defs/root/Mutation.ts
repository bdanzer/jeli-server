// searchNutritionBrand(query: String!): [DummyObject2!]
export default `
  type Mutation {
    googleSignIn(googleToken: String!): User!
    userSetup(
      role: String!, 
      weight: Float!, 
      height: Float!, 
      bodyFat: Float, 
      userActivity: String!, 
      sex: String!, 
      dateOfBirth: String!, 
      timezone: String!, 
      preferredTheme: String, 
      preferredMetric: String!
    ): User!
    addProduct(
      name: String!
      brand: String!
      calories: Float!
      carbs: Float!
      fat: Float!
      protein: Float!
      dietType: String!
      measurementType: String!
      productType: String!
      servingSize: Float!
      servings: Float!
    ): Product!
    addNutritionLog(
      loggedMeals: [LoggedMealInput!]
      nutritionLogTemplateId: Int!
    ): NutritionLog!
    addMeal(
      meal: [ProductInput!]!
      mealName: String!
    ): Meal!
  }
`;
