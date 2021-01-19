const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
    {
        mealName: {
            type: String,
        },
        mealType: {
            enum: ['snack1', 'snack2', 'snack3', 'meal1', 'meal2', 'meal3'],
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
            },
        ],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

mealSchema.statics.search = async function (mealName) {
    const meal = await this.find({
        name: {
            $regex: new RegExp('^' + mealName.toLowerCase(), 'i'),
        },
    });

    return meal;
};

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
