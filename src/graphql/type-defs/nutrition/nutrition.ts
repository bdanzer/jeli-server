export const nutritionLogTypeDef = `
  input ProductInput {
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
  }
  input LoggedMealInput {
    templateOrder: Int!
    products: [ProductInput!]
  }
  type LoggedMeal {
    templateOrder: Int!
    products: [Product!]
  }
  type NutritionLog {
    loggedMeals: [LoggedMeal!]!
    nutritionLogTemplateId: Int!
  }
`;
