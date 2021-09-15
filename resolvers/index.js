module.exports.resolvers = {
  Query: {},
  Mutation: {
    searchNutritionBrand: async (_, { query }, { dataSources }) => {
      const nutrition = await dataSources.nutrition.searchBrand({ query });
      return nutrition;
    },
    searchNutritionByNixId: async (_, { itemId }, { dataSources }) => {
      const nutritionItem = await dataSources.nutrition.searchByNixId({
        itemId,
      });
      return nutritionItem;
    },
    searchNutritionByUPC: async (_, { upc }, { dataSources }) => {
      const nutritionItem = await dataSources.nutrition.searchByUPC({ upc });
      return nutritionItem;
    },
  },
};
