import _ from "lodash";
const resolversQueries = [
  { resolver: "findById", key: "ById" },
  { resolver: "findByIds", key: "ByIds" },
  { resolver: "findOne", key: "One" },
  { resolver: "findMany", key: "Many" },
  { resolver: "count", key: "Count" },
  { resolver: "connection", key: "Connection" },
  { resolver: "pagination", key: "Pagination" },
];
const resolversMutations = [
  { resolver: "createOne" },
  { resolver: "createMany" },
  { resolver: "updateById" },
  { resolver: "updateOne" },
  { resolver: "updateMany" },
  { resolver: "removeById" },
  { resolver: "removeOne" },
  { resolver: "removeMany" },
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const resolvers = (prefix, resolverArray, model) => {
  let resolverObj = {};
  resolverArray.forEach(
    (resolverType) =>
      (resolverObj[
        `${prefix}${capitalizeFirstLetter(
          resolverType.key ? resolverType.key : resolverType.resolver
        )}`
      ] = model.getResolver(resolverType.resolver))
  );
  return resolverObj;
};

const defaultOptions = {
  queries: [],
  mutations: [],
};

const resolverGenerator = (prefix, model, options = {}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const queryResolvers = resolvers(
    prefix,
    [...resolversQueries, ...mergedOptions.queries],
    model
  );
  const mutationResolvers = resolvers(
    prefix,
    [...resolversMutations, ...mergedOptions.mutations],
    model
  );
  return { queryResolvers, mutationResolvers };
};

export default resolverGenerator;
