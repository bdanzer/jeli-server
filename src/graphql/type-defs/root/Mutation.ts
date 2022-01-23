export default `
  type Mutation {
    dummyMutation(input: DummyInput!): Boolean!
    searchNutritionBrand(query: String!): [DummyObject2!]
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
  }
`;
