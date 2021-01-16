const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
    {
        brand: { type: String, required: true },
        calories: { type: Number, required: true },
        carbs: { type: Number, required: true },
        fat: { type: Number, required: true },
        protein: { type: Number, required: true },
        dietType: { type: String },
        measurementType: { type: String, required: true },
        name: { type: String, required: true },
        mealType: { type: String, required: true },
        amazonAffiliate: { type: String },
        servingSize: { type: Number, required: true },
        servings: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

mealSchema.statics.search = async function (mealName) {
    const meal = await this.find({
        name: {
            $regex: new RegExp("^" + mealName.toLowerCase(), "i"),
        },
    });

    return meal;
};

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
