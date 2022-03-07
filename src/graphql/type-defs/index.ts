import { gql } from "apollo-server-lambda";

import { nutritionLogTypeDef } from "./nutrition/nutrition";
// Objects
import productTypeDef from "./product/product";
// Root types
import Mutation from "./root/Mutation"; // tslint:disable-line ordered-imports
import Query from "./root/Query"; // tslint:disable-line ordered-imports
import userTypeDef from "./user/user";

const typeDefStrings = [
  userTypeDef,
  productTypeDef,
  nutritionLogTypeDef,
  // queryTypeDefs,
  // Root types
  Mutation,
  Query,
];

const typeDefs = typeDefStrings.join("");

export default typeDefs;
