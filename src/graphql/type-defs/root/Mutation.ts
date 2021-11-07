export default `
  type Mutation {
    dummyMutation(input: DummyInput!): Boolean!
    searchNutritionBrand(query: String!): [DummyObject2!]
  }
`;
