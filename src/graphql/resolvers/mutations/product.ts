import { PrismaClient, Product } from "@prisma/client";

export const addProduct = async (
  _: any,
  {
    name,
    brand,
    calories,
    carbs,
    fat,
    protein,
    dietType,
    measurementType,
    productType,
    servingSize,
    servings,
  },
  { googleClient, prismaClient, headers, setCookies, isUserAuthd }
): Promise<Product> => {
    console.log('USER AUTHD', isUserAuthd)
    if (!isUserAuthd) {
        throw new Error('USER UNAUTHORIZED');
    }
    const userId = isUserAuthd?.data?.id;

    const product = await (prismaClient as PrismaClient).product.create({
        data: {
            name,
            brand,
            calories,
            carbs,
            fat,
            protein,
            dietType,
            measurementType,
            productType,
            servingSize,
            servings,
            userId
        }
    })

    return product;

    // return await (prismaClient as PrismaClient).product.findMany({
    //     where: {
    //         userId
    //     }
    // })
};
