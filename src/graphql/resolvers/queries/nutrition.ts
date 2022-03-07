import { NutritionLog } from "@prisma/client";
import { ApolloContext } from "../../../@types/apolloContext";

export const getNutritionLogs = async (
  _: any,
  { dateFrom, dateTo },
  {
    headers,
    googleClient,
    prismaClient,
    isUserAuthd,
    setCookies,
  }: ApolloContext
): Promise<NutritionLog[]> => {
  return null;
};
