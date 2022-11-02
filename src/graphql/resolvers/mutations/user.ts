import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { ApolloContext } from "../../../@types/apolloContext";

export async function userSetup(
  _: any,
  {
    role,
    weight,
    height,
    bodyFat,
    userActivity,
    sex,
    dateOfBirth,
    timezone,
    preferredTheme,
    preferredMetric,
  },
  {
    googleClient,
    prismaClient,
    headers,
    setCookies,
    isUserAuthd,
  }: ApolloContext
): Promise<User> {
  console.log(headers, process.env);
  try {
    const userData = prismaClient.user.update({
      where: {
        email: isUserAuthd?.data?.email,
      },
      data: {
        role,
        setUpComplete: true,
        weight,
        height,
        bodyFat,
        userActivity,
        sex,
        dateOfBirth,
        timezone,
        preferredTheme: "default",
        preferredMetric,
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
          // expires: moment().add(1, 'hours').format(),
          httpOnly: true,
          maxAge: 3600,
          path: "/",
          sameSite: "none",
          secure: true,
        },
      });
      return userData;
    }

    throw new Error("No User Account Exists");
  } catch (e) {
    throw new Error("INVALID_TOKEN");
  }
}

export async function userLogin(
  _: any,
  { googleToken },
  {
    googleClient,
    headers,
    setCookies,
    prismaClient,
    isUserAuthd,
  }: ApolloContext
): Promise<User> {
  console.log(headers, process.env);
  try {
    console.log("google TOken given", googleToken);
    // console.log(headers, process.env)
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    const email = payload["email"];
    console.log("userId", userId, email);

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
          // expires: moment().add(1, 'hours').format(),
          httpOnly: true,
          maxAge: 3600,
          path: "/",
          sameSite: "none",
          secure: true,
        },
      });
      return userData;
    }

    throw new Error("No User Account Exist Yet");
  } catch (e) {
    throw new Error("INVALID_TOKEN");
  }
}
