const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

nutritionLogSchema.statics.search = async function (nutritionLogName) {
  const nutritionLog = await this.find({
    name: {
      $regex: new RegExp("^" + nutritionLogName.toLowerCase(), "i"),
    },
  });

  return nutritionLog;
};

const NutritionLog = mongoose.model("NutritionLog", nutritionLogSchema);

module.exports = NutritionLog;
