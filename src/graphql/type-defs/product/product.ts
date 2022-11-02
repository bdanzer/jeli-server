const productTypeDef = `
  type Product {
    name: String!
    brand: String!
    calories: Float!
    carbs: Float!
    fat: Float!
    protein: Float!
    measurementUnitType: String!
    measurementValue: Float!
    servingType: String!
    servings: Float!
  }
  type ProductModifier {
    name: String!
    brand: String!
    calories: Float!
    carbs: Float!
    fat: Float!
    protein: Float!
    measurementUnitType: String!
    measurementValue: Float!
    servingType: String!
    servings: Float!
    modifier: Float!
  }
`;

export default productTypeDef;
