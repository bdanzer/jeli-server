const { composeWithMongoose } = require("graphql-compose-mongoose");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    protein: { type: Number, required: true },
    dietType: { type: String },
    measurementType: { type: String, required: true },
    name: { type: String, required: true },
    productType: { type: String, required: true },
    amazonAffiliate: { type: String },
    servingSize: { type: Number, required: true },
    servings: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.statics.search = async function (productName) {
  const product = await this.find({
    name: {
      $regex: new RegExp("^" + productName.toLowerCase(), "i"),
    },
  });

  return product;
};

const Product = mongoose.model("Product", productSchema);

const ProductTC = composeWithMongoose(Product);

ProductTC.addResolver({
  name: "productSearch",
  kind: "query",
  args: { name: "String" },
  type: [ProductTC],
  resolve: async ({ source, args }) => {
    const products = await Product.find({
      name: {
        $regex: new RegExp(args.name.toLowerCase(), "i"),
      },
    }).exec();

    if (!products) throw new Error("found nothing");
    return products;
  },
});

module.exports = { Product, ProductTC };
