import resolverGenerator from "../utils/resolverGenerator";
import { UserTC } from "../apis/users/userModel";
export const UserGraph = resolverGenerator("user", UserTC, {
  mutations: [
    { resolver: "userLogin", key: "Login" },
    { resolver: "userSetup", key: "Setup" },
  ],
  queries: [{ resolver: "getUser", key: "FromCookie" }],
});