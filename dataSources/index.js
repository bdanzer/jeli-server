const { RESTDataSource } = require("apollo-datasource-rest");
const _ = require("lodash");

const nutrientMap = {
  203: "protein",
  269: "sugar",
  307: "sodium",
  205: "carbs",
  204: "totalFat",
  539: "addedSugar",
  601: "cholesterol",
};

const getNutrient = (brand) => {
  console.log("BRAND", brand);
  const fullNutrients = _.get(brand, "full_nutrients");
  let nutrients = {
    protein: 0,
    sugar: 0,
    sodium: 0,
    carbs: 0,
    totalFat: 0,
    addedSugar: 0,
    cholesterol: 0,
  };
  fullNutrients.forEach((nutrient) => {
    if (nutrientMap[nutrient.attr_id]) {
      nutrients = {
        ...nutrients,
        [nutrientMap[nutrient.attr_id]]: nutrient.value,
      };
    }
  });

  console.log("nutrients", nutrients);

  return nutrients;
};

class NutritionAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://trackapi.nutritionix.com/v2/";
  }

  willSendRequest(request) {
    request.headers.set("x-app-id", "7131a55c");
    request.headers.set("x-app-key", "0f50f4755d0067d4d11aa63921b6e318");
  }

  //   searchReducer(fields) {
  //     return {
  //       brandName: _.get(fields, "brand_name"),
  //       itemName: _.get(fields, "item_name"),
  //       brandId: _.get(fields, "brand_id"),
  //       itemId: _.get(fields, "item_id"),
  //       upc: _.get(fields, "upc"),
  //       itemType: _.get(fields, "item_type"),
  //       itemDescription: _.get(fields, "item_description"),
  //       ingredientStatement: _.get(fields, "nf_ingredient_statement"),
  //       calories: _.get(fields, "nf_calories"),
  //       caloriesFromFat: _.get(fields, "nf_calories_from_fat"),
  //       totalFat: _.get(fields, "nf_total_fat"),
  //       saturatedFat: _.get(fields, "nf_saturated_fat"),
  //       monounsaturatedFat: _.get(fields, "nf_monounsaturated_fat"),
  //       polyunsaturatedFat: _.get(fields, "nf_polyunsaturated_fat"),
  //       transFattyAcid: _.get(fields, "nf_trans_fatty_acid"),
  //       cholesterol: _.get(fields, "nf_cholesterol"),
  //       sodium: _.get(fields, "nf_sodium"),
  //       totalCarbohydrate: _.get(fields, "nf_total_carbohydrate"),
  //       dietaryFiber: _.get(fields, "nf_dietary_fiber"),
  //       sugars: _.get(fields, "nf_sugars"),
  //       protein: _.get(fields, "nf_protein"),
  //       vitaminADV: _.get(fields, "nf_vitamin_a_dv"),
  //       vitaminCDV: _.get(fields, "nf_vitamin_c_dv"),
  //       calciumDV: _.get(fields, "nf_calcium_dv"),
  //       ironDV: _.get(fields, "nf_iron_dv"),
  //       potassium: _.get(fields, "nf_potassium"),
  //       servingsPerContainer: _.get(fields, "nf_servings_per_container"),
  //       servingSizeQty: _.get(fields, "nf_serving_size_qty"),
  //       servingSizeUnit: _.get(fields, "nf_serving_size_unit"),
  //       servingWeightGrams: _.get(fields, "nf_serving_weight_grams"),
  //       metricQty: _.get(fields, "metric_qty"),
  //       metricUOM: _.get(fields, "metric_uom"),
  //       imagesFrontFullUrl: _.get(fields, "images_front_full_url"),
  //       updatedAt: _.get(fields, "updated_at"),
  //       sectionIds: _.get(fields, "section_ids"),
  //     };
  //   }

  nutrientMapper(items) {
    const mappedBranded = items.map((brand) => ({
      foodName: _.get(brand, "food_name"),
      nixBrandId: _.get(brand, "nix_brand_id"),
      photo: {
        thumb: _.get(brand, "photo.thumb"),
      },
      brandName: _.get(brand, "brand_name"),
      brandItemName: _.get(brand, "brand_name_item_name"),
      foodName: _.get(brand, "food_name"),
      servingQty: _.get(brand, "serving_qty"),
      servingUnit: _.get(brand, "serving_unit"),
      nutritionInfo: {
        calories: _.get(brand, "nf_calories"),
        ...getNutrient(brand),
      },
    }));
    console.log("FULL BRANDED", mappedBranded);
    return mappedBranded;
    // {
    //     "branded": [
    //         {
    // "serving_weight_grams": 56,
    // "nix_item_id": "5826bef5f928c0cc0712d83d",
    // "serving_unit": "egg",
    // "brand_name_item_name": "True Goodness by Meijer Grade A Extra Large Eggs",
    // "serving_qty": 1,
    // "nf_calories": 80,
    // "region": 1,
    // "brand_type": 2,
    // "locale": "en_US"
    //             "food_name": "Grade A Extra Large Eggs",
    //             "nix_brand_id": "559e9fb1058e5ea47bca6d14",
    //             "photo": {
    //                 "thumb": "https://nutritionix-api.s3.amazonaws.com/5826bef9f928c0cc0712d83f.jpeg"
    //             },
    //             "brand_name": "True Goodness by Meijer",
    //             "full_nutrients": [
    //                 {
    //                     "value": 7,
    //                     "attr_id": 203
    //                 },
    //                 {
    //                     "value": 4.5,
    //                     "attr_id": 204
    //                 },
    //                 {
    //                     "value": 0,
    //                     "attr_id": 205
    //                 },
    //                 {
    //                     "value": 80,
    //                     "attr_id": 208
    //                 },
  }

  async searchByNixId({ itemId }) {
    const response = await this.get("search/item", { nix_item_id: itemId });
    console.log("response", response);
    return response;
  }

  async searchByUPC({ upc }) {
    const response = await this.get("search/item", { upc });
    console.log("response", response);

    const foods = _.get(response, "foods");
    return this.nutrientMapper(foods);
  }

  async searchBrand({ query }) {
    const response = await this.get("search/instant", {
      query,
      branded: true,
      common: false,
      detailed: true,
    });

    const branded = _.get(response, "branded");
    return this.nutrientMapper(branded);
  }
}

module.exports = NutritionAPI;
