import resolverGenerator from "../../../utils/resolverGenerator";
import { ProductTC } from "./productsModel";
export const ProductGraph = resolverGenerator("product", ProductTC, {
  queries: [{ resolver: "productSearch", key: "Search" }],
});