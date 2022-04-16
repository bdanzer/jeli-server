import { NutritionLog } from "@prisma/client";
import { ApolloContext } from "../../../@types/apolloContext";
import moment from 'moment-timezone';

export const addNutritionLog = async (
  _: any,
  { loggedMeals, nutritionLogTemplateId },
  {
    googleClient,
    prismaClient,
    headers,
    setCookies,
    isUserAuthd,
  }: ApolloContext
): Promise<NutritionLog> => {
  console.log("USER AUTHD", isUserAuthd);
  if (!isUserAuthd) {
    throw new Error("USER UNAUTHORIZED");
  }
  const userId = 1 || isUserAuthd?.data?.id;

  const endOfDay = moment().tz(isUserAuthd?.data?.timezone).endOf('day').format();
  const startOfDay = moment().tz(isUserAuthd?.data?.timezone).startOf('day').format()
  const date = moment().tz(isUserAuthd?.data?.timezone).format();

  const log = await prismaClient.nutritionLog.findFirst({
    where: {
      updatedAt: {
        gte: startOfDay,
        lte:  endOfDay
      }
    }
  })

  let nutritionLog;

  if (log) {
    nutritionLog = await prismaClient.nutritionLog.update({
      data: {
        loggedMeals,
        nutritionLogTemplateId: 1,
        userId,
        updatedAt: date
      },
      where: {
        id: log.id
      }
    });
  } else {
    nutritionLog = await prismaClient.nutritionLog.create({
      data: {
        loggedMeals,
        nutritionLogTemplateId: 1,
        userId,
        createdAt: date,
        updatedAt: date
      },
    });
  }

  return nutritionLog;
};

const templates = [
  {
    id: 1,
    userId: 1,
    templateStructure: [
      {
        templateOrder: 1,
        name: "Meal 1",
      },
      {
        templateOrder: 2,
        name: "Snack 1",
      },
      {
        templateOrder: 3,
        name: "Meal 2",
      },
      {
        templateOrder: 4,
        name: "Snack 2",
      },
      {
        templateOrder: 5,
        name: "Meal 3",
      },
      {
        templateOrder: 6,
        name: "Snack 3",
      },
    ],
  },
];

const nutritionLog = {
  id: 1,
  templateId: 1,
  userId: 1,
  loggedMeals: [
    {
      templateOrder: 1,
      products: [
        {
          id: "",
          name: "",
          calories: "",
          fat: "",
        },
      ],
      // name: null,
      // savedMeal: false,
      // createdAt: 'string',
      // updatedAt: 'string'
    },
  ],
  createdAt: "string",
  updatedAt: "string",
};
