import { NutritionLog } from "@prisma/client";

export const getNutritionLogs = async (
  _: any,
  { dateFrom, dateTo },
  { headers, googleClient, prismaClient, isUserAuthd, setCookies }
): Promise<NutritionLog[]> => {
  return null;
};
