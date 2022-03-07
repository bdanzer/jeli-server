import { composeWithMongoose } from "graphql-compose-mongoose";
import { Schema, model } from "mongoose";
import { ProductTC } from "../products/productsModel";

const mealSchema = new Schema(
  {
    mealName: {
      type: String,
    },
    meal: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        modifier: {
          type: Number,
        },
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

mealSchema.statics.search = async function (mealName) {
  const meal = await this.find({
    mealName: {
      $regex: ".*" + mealName + ".*",
    },
  }).populate("meal.product");

  return meal;
};

export const Meal = model("Meal", mealSchema);
export const MealTC = composeWithMongoose(Meal);

MealTC.getFieldOTC("meal").addRelation("product", {
  resolver: () => ProductTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => {
      console.log("SOURCE IS HERE", source.product);
      return source.product;
    },
  },
  projection: {
    product: true,
  }, // point fields in source object, which should be fetched from DB
});

MealTC.addResolver({
  name: "mealSearch",
  kind: "query",
  args: { mealName: "String" },
  type: [MealTC],
  resolve: async ({ source, args }) => {
    const products = await Meal.find({
      mealName: {
        $regex: new RegExp(args.mealName.toLowerCase(), "i"),
      },
    }).exec();

    if (!products) throw new Error("found nothing");
    return products;
  },
});
