import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { ApolloContext } from "../../../@types/apolloContext";

export async function getUser(
  _: any,
  { googleToken },
  {
    headers,
    googleClient,
    prismaClient,
    isUserAuthd,
    setCookies,
  }: ApolloContext
): Promise<User> {
  console.log("isUSerAuthd in getUSer", isUserAuthd);

  const userData = await prismaClient.user.findUnique({
    where: {
      email: isUserAuthd?.data?.email,
    },
  });

  if (userData) {
    setCookies.push({
      name: "userAuth",
      value: jwt.sign(
        {
          data: userData,
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 }
      ),
      options: {
        httpOnly: true,
        maxAge: 3600,
        path: "/",
        sameSite: "none",
        secure: true,
      },
    });
    return userData;
  }

  throw new Error("No User Account Exist");
}
