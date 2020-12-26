const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        brand: { type: String, required: true },
        calories: { type: Number, required: true },
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true },
        protein: { type: Number, required: true },
        foodType: { type: String, required: true },
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

module.exports = Product;
