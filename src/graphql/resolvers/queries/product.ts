import { Product } from "@prisma/client";
import { ApolloContext } from "../../../@types/apolloContext";

export const searchProducts = async (
  _: any,
  { textSearch },
  {
    headers,
    googleClient,
    prismaClient,
    isUserAuthd,
    setCookies,
  }: ApolloContext
): Promise<Product[]> => {
  const products = prismaClient.product.findMany({
    where: {
      name: {
        contains: textSearch,
      },
    },
  });

  if (!products) {
    throw new Error("No Products Found");
  }

  return products;
};
