import { ApolloServer } from "apollo-server-lambda";
import NutritionAPI from "../dataSources";
import graphqlSchemas from "../schemas";
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library'
import httpHeadersPlugin from "apollo-server-plugin-http-headers";
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

const NODE_ENV = process.env.NODE_ENV;
const GoogleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const IS_DEV = !NODE_ENV || !["production"].includes(NODE_ENV);
console.log('ISDEV', IS_DEV);

let dbConnect;
const dbName = "jeli";
const dbPass = "m9xzHnTZQN6YbLY8";

dbConnect = {
  dev: `mongodb://127.0.0.1:27017/${dbName}`,
  stag: `mongodb+srv://bdanzer:${dbPass}@jeli.zxqj5.mongodb.net/${dbName}`,
};

const env = "dev";

console.log(dbConnect);

const connectDb = () => mongoose.connect(dbConnect[env]);

export default async (event, context, callback) => {
  await connectDb()
  console.log('this is called')
  const apolloServer = new ApolloServer({
    // subscriptions: {},
    introspection: true,
    schema: graphqlSchemas,
    plugins: [httpHeadersPlugin],
    context: async ({ event, context, express }) => {
      const headers = event.headers

      console.log('headers', headers)
      const cookies = headers.Cookie ? cookie.parse(headers.Cookie) : null
      console.log('cookies', express.req.cookies, cookies)

      let isUserAuthd: any;

      try {
        isUserAuthd = jwt.verify(cookies?.userAuth, process.env.JWT_SECRET)
      } catch (e) {
        isUserAuthd = false
      }

      console.log('isUserAuthd', isUserAuthd)

      return {
        googleClient: GoogleClient,
        headers,
        isUserAuthd,
        functionName: context.functionName,
        event,
        context,
        setCookies: new Array(),
        setHeaders: new Array(),
        expressReq: express.req,
        expressRes: express.res
      }
    },
    dataSources: () => ({
      nutrition: new NutritionAPI(),
    }),
  });

  console.log('graph handler called')

  return apolloServer.createHandler({
    expressGetMiddlewareOptions: {
      cors: {
        origin: ['http://localhost:8080', 'https://studio.apollographql.com'],
        credentials: true,
      },
    }
  })(event, context, callback)
};
