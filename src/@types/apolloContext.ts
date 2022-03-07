import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import {
  APIGatewayEventRequestContext,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { OAuth2Client } from "google-auth-library";

export interface ApolloContext {
  prismaClient: PrismaClient;
  googleClient: OAuth2Client;
  headers: {
    [key: string]: string;
  };
  isUserAuthd: any;
  functionName: string;
  event: APIGatewayProxyEvent;
  context: APIGatewayEventRequestContext;
  setCookies: any[];
  setHeaders: any[];
  expressReq: ExpressContext["req"];
  expressRes: ExpressContext["res"];
}
