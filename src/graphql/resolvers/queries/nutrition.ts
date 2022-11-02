import { Meal, NutritionLog } from "@prisma/client";
import { ApolloContext } from "../../../@types/apolloContext";
import moment from "moment-timezone";

export const getNutritionLog = async (
  _: any,
  { addDays },
  {
    headers,
    googleClient,
    prismaClient,
    isUserAuthd,
    setCookies,
  }: ApolloContext
): Promise<NutritionLog> => {
  if (!isUserAuthd?.data) {
    throw new Error("User not Authorized");
  }

  const userTimezone = isUserAuthd?.data.timezone;

  if (!userTimezone) {
    new Error("User must have a timezone");
  }

  const endOfDay = moment().tz(userTimezone).add(addDays, 'day').endOf("day").format();
  const startOfDay = moment().tz(userTimezone).add(addDays, 'day').startOf("day").format();

  const nutritionLog = prismaClient.nutritionLog.findFirst({
    where: {
      updatedAt: {
        gte: new Date(startOfDay),
        lte: new Date(endOfDay),
      },
      userId: isUserAuthd.data.id
    },
  });

  if (!nutritionLog) {
    throw new Error("Nutrition log not found");
  }

  return nutritionLog;
};

export const getNutritionLogs = async (
  _: any,
  { addDays },
  {
    headers,
    googleClient,
    prismaClient,
    isUserAuthd,
    setCookies,
  }: ApolloContext
): Promise<NutritionLog[]> => {
  if (!isUserAuthd?.data) {
    throw new Error("User not Authorized");
  }

  // const endOfDay = moment().tz(userTimezone).add(addDays, 'day').endOf("day").format();
  // const startOfDay = moment().tz(userTimezone).add(addDays, 'day').startOf("day").format();

  const nutritionLog = prismaClient.nutritionLog.findMany({
    where: {
      userId: isUserAuthd.data.id
    },
  });

  if (!nutritionLog) {
    throw new Error("Nutrition log not found");
  }

  return nutritionLog;
};

export const getMeals = async (
  _: any,
  { products, mealName },
  {
    googleClient,
    prismaClient,
    headers,
    setCookies,
    isUserAuthd,
  }: ApolloContext
): Promise<Meal[]> => {
  console.log("USER AUTHD", isUserAuthd);
  if (!isUserAuthd) {
    throw new Error("USER UNAUTHORIZED");
  }
  const userId = 1 || isUserAuthd?.data?.id;

  const meals = await prismaClient.meal.findMany({
    where: {
      userId
    }
  })

  return meals
};

