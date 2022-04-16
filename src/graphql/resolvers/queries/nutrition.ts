import { NutritionLog } from "@prisma/client";
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
    },
  });

  if (!nutritionLog) {
    throw new Error("Nutrition log not found");
  }

  return nutritionLog;
};
