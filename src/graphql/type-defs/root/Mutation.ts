export default `
  type Mutation {
    dummyMutation(input: DummyInput!): Boolean!
    searchNutritionBrand(query: String!): [DummyObject2!]
    googleSignIn(googleToken: String!): Boolean
  }
`;
