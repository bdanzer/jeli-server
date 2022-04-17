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
    modifier: Float!
  }
  input LoggedMealInput {
    products: [ProductInput!]
  }
  type LoggedMeal {
    products: [Product!]
  }
  type NutritionLog {
    loggedMeals: [LoggedMeal!]!
    nutritionLogTemplateId: Int!
    updatedAt: String!
    createdAt: String!
  }
  type Meal {
    products: [ProductModifier!]!
    name:     String!
  }
`;
