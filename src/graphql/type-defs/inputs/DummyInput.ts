export default `
  input DummyInput {
    firstInput: String!
    secondInput: String!
  }
`;

const test = `
  type User {
    id: Number!
    googleId: String!
    displayName: String!
    email: String!
    setUpComplete: Boolean!
    createdAt: Date!
    updatedAt: Date!
    role: String!
    fitnessInfo {
      weight: Float!
      height: Float!
      bodyFat: Float!
      userActivity: String!
      sex: String!
    }
    userSettings {
      dateOfBirth: Date!
      timezone: String!
      preferredTheme: String!
      preferredMetric: String!
    }
  }

  type Product {
    id: Number!
    name: String!
    brand: String!
    calories: Number!
    carbs: Number!
    fat: Number!
    protein: Number!
    dietType: String!
    measurementType: String!
    productType: String!
    servingSize: Number!
    servings: Number!
    userId: Number!
    createdAt: Date
    updatedAt Date
  }

  type Meal {
    name: String!
    userId: Number!
    productId: Number!
    product: Product
  }

  type NutritionLog {
    meals: [Meal]
    user: [User]
    userId: Number!
    createdAt: Date!
    updatedAt: Date!
  }
`