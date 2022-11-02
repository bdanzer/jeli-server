export const nutritionLogTypeDef = `
  input ProductInput {
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
  input LoggedMealInput {
    products: [ProductInput!]
  }
  type LoggedMeal {
    products: [ProductModifier!]
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
