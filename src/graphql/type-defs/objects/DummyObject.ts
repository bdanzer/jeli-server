export default `
  type DummyObject {
    firstItem: String!
    secondItem: String!
  }

  type NutritionInfo {
    calories: String
  }

  type PhotoInfo {
    thumb: String
  }

  type DummyObject2 {
    foodName: String
    nixBrandId: String
    photo: PhotoInfo
    brandName: String
    brandItemName: String
    servingQty: String
    servingUnit: String
    nutritionInfo: NutritionInfo
  }
`;
