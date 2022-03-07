import { NutritionLog } from "@prisma/client";
import { ApolloContext } from "../../../@types/apolloContext";

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
  const userId = isUserAuthd?.data?.id;

  const nutritionLog = await prismaClient.nutritionLog.create({
    data: {
      loggedMeals: {},
      nutritionLogTemplateId: 1,
      userId,
    },
  });

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
