import { composeWithMongoose } from "graphql-compose-mongoose";
import { Schema, model } from "mongoose";
import { ProductTC } from "../products/productsModel";
import moment from 'moment';

const nutritionLogSchema = new Schema(
  {
    templateName: {
      type: Schema.Types.String
    },
    template: [
      {
        name: {
          type: Schema.Types.String
        },
        data: [
          {
            product: {
              type: Schema.Types.ObjectId,
              ref: "Product",
            },
            modifier: {
              type: Number,
            },
          },
        ],
      }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Schema.Types.Date,
      index: true,
    },
  },
  { timestamps: true }
);

export const NutritionLog = model("NutritionLog", nutritionLogSchema);
export const NutritionLogTC = composeWithMongoose(NutritionLog, {
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


NutritionLogTC.addResolver({
  name: "nutritionLogByDate",
  kind: "query",
  args: { dateFrom: "String", dateTo: "String" },
  type: [NutritionLogTC],
  resolve: async ({ source, args, context }) => {
    const { isUserAuthd } = context

    if (!isUserAuthd) {
      throw new Error('User is not authorized')
    }

    const userId = isUserAuthd?.data?._id
    if (!userId) {
      throw new Error('No User ID provided')
    }

    console.log('dates', args.dateFrom, args.dateTo);
    const nutritionLogs = await NutritionLog
      .find({
        //query today up to tonight
        createdAt: {
          $gte: moment(args.dateFrom).startOf("day"),
          $lte: moment(args.dateTo).endOf("day"),
        },
        user: userId
      })

    console.log('nutritionLogs', JSON.stringify(nutritionLogs, null, 4));

    if (!nutritionLogs) {
      throw new Error("NO_NUTRITION_LOGS_FOUND");;
    }

    return nutritionLogs
  },
});

NutritionLogTC
  .getFieldOTC('template')
  .getFieldOTC('data')
  .addRelation("product", {
    resolver: () => ProductTC.getResolver("findById"),
    prepareArgs: {
      _id: (source) => {
        console.log('addRelation called', source)
        return source.product
      }
    },
    projection: {
      product: true
    }, // point fields in source object, which should be fetched from DB
  });
