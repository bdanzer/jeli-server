const productTypeDef = `
  type Product {
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
    modifier: Float!
  }
  type ProductModifier {
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
    modifier: Float!
  }
`;

export default productTypeDef;
