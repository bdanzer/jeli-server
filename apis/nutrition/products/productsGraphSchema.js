const resolverGenerator = require("../../../utils/resolverGenerator");
const { ProductTC } = require("./productsModel");
const ProductGraph = resolverGenerator("product", ProductTC, {
  queries: [{ resolver: "productSearch", key: "Search" }],
});

module.exports = { ProductGraph };
