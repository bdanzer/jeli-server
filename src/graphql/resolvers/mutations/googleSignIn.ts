import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { ApolloContext } from "../../../@types/apolloContext";

async function googleSignIn(
  _: any,
  { googleToken },
  { googleClient, headers, setCookies, prismaClient }: ApolloContext
): Promise<User> {
  console.log("google TOken given", googleToken);
  // console.log(headers, process.env)
  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (e) {
    throw new Error("Failed verifying google token");
  }
  const payload = ticket.getPayload();
  const userId = payload["sub"];
  const email = payload["email"];
  console.log("userId", userId, email);

  let userData =
    (await prismaClient.user.findUnique({ where: { email } })) || null;
  if (!userData) {
    userData = await prismaClient.user.create({
      data: {
        email,
        firstName: "",
        lastName: "",
        setUpComplete: false,
        role: "NEW_USER",
      },
    });
  }

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
}

export default googleSignIn;
