import resolverGenerator from "../utils/resolverGenerator";
import { ProductTC } from "../apis/nutrition/products/productsModel";
export const ProductGraph = resolverGenerator("product", ProductTC, {
  queries: [{ resolver: "productSearch", key: "Search" }],
});
