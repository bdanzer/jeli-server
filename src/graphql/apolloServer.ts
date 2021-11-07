import { ApolloServer } from "apollo-server-lambda";
import NutritionAPI from "../dataSources";
import graphqlSchemas from "../schemas";
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library'

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

export default (event, context, callback) => {
  connectDb().then(() => {
    const apolloServer = new ApolloServer({
      // subscriptions: {},
      introspection: true,
      schema: graphqlSchemas,
      context: async ({ event, context }) => {
        const headers = event.headers
        const googleToken = headers?.['GoogleToken']
        const ticket = await GoogleClient.verifyIdToken({ idToken: googleToken, audience: process.env.GOOGLE_CLIENT_ID })
        const payload = ticket.getPayload()
        const userId = payload['sub']

        console.log('userId', userId)

        return {
          headers,
          functionName: context.functionName,
          event,
          context,
        }
      },
      playground: {
        endpoint: "/dev/graphql"
      },
      dataSources: () => ({
        nutrition: new NutritionAPI(),
      }),
    });

    apolloServer.createHandler({
      cors: {
        origin: true,
        credentials: true,
      },
    })(event, context, callback)
  })
};
