const passport = require("passport");
module.exports.resolvers = {
  Query: {},
  Mutation: {
    searchNutritionBrand: async (_, { query }, { dataSources }) => {
      const nutrition = await dataSources.nutrition.searchBrand({ query });
      return nutrition;
    },
    searchNutritionByNixId: async (_, { itemId }, { dataSources }) => {
      const nutritionItem = await dataSources.nutrition.searchByNixId({
        itemId,
      });
      return nutritionItem;
    },
    searchNutritionByUPC: async (_, { upc }, { dataSources }) => {
      const nutritionItem = await dataSources.nutrition.searchByUPC({ upc });
      return nutritionItem;
    },
    authGoogle: async () => {},
    google: async () => {
      passport.authenticate("google", {
        scope: ["profile", "email"],
      });
    },
    logIn: async (_, { token }, { res, req }) => {
      const userData =
        (await req.context.models.User.findById(req.user)) || null;

      if (userData) {
        return {
          status: "success",
          data: userData,
        };
      }

      return {
        status: "failed",
        data: null,
      };
    },
    logOut: async () => {
      req.logout();
      res.redirect("http://localhost:8080");
    },
    authGoogleCallBack: async () => {
      passport.authenticate("google", {
        scope: ["profile", "email"],
        failureRedirect: "/errors",
        session: true,
      }),
        function (req, res) {
          if (req.user) {
            console.log(req.user);
            res.cookie("token", req.user);
            // console.log('session', req.session);
            return res.redirect("http://localhost:8080/dashboard");
          } else {
            console.log("error");
            return res.redirect("http://localhost:8080/errors");
          }
        };
    },
  },
};
