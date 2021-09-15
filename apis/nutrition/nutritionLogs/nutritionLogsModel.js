const { composeWithMongoose } = require("graphql-compose-mongoose");
const mongoose = require("mongoose");
const { ProductTC } = require("../products/productsModel");

const nutritionLogSchema = new mongoose.Schema(
  {
    meal1: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    snack1: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    meal2: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    snack2: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    meal3: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    snack3: {
      data: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          modifier: {
            type: Number,
          },
        },
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      index: true,
    },
  },
  { timestamps: true }
);

const NutritionLog = mongoose.model("NutritionLog", nutritionLogSchema);
const NutritionLogTC = composeWithMongoose(NutritionLog, {
  operators: true,
});

NutritionLogTC.addResolver({
  name: "nutritionLogSearch",
  kind: "query",
  args: { name: "String" },
  type: [NutritionLogTC],
  resolve: async ({ source, args }) => {
    const products = await NutritionLog.find({
      name: {
        $regex: new RegExp(args.name.toLowerCase(), "i"),
      },
    }).exec();

    if (!products) throw new Error("found nothing");
    return products;
  },
});

NutritionLogTC.getFieldOTC("snack1")
  .getFieldOTC("data")
  .addRelation("product", {
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

module.exports = { NutritionLog, NutritionLogTC };
