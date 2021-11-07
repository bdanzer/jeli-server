const users = [
  {
    userId: 1,
    username: "bdanzer",
    email: "britt.danzer@gmail.com",
    firstName: "Britt",
    lastName: "Danzer",
    role: "admin",
    locale: "US",
    fitnessInfo: {
      weight: {
        metric: "thing",
        value: 182,
      },
      height: {
        metric: "imperial",
        feet: "5",
        inches: "4",
      },
    },
    userSettings: {
      goalView: "relays",
      preferredColor: "#000",
      preferredTheme: "light",
      preferredMetric: "ibs", // us or uk
      turnOnInspiringQuotes: true,
    },
    jwt: null,
  },
];

export default users;

// One of the most important aspect of a goal is measurability. This app is designed
// to make sure you are measurability reaching your goals. If you're like me then there
// are days were you feel unmotivated to workout. But the great thing for this app that has
// actually helped me is seeing how far I've gotten in such a short amount of time. It really
// inspires me.

// Creaters will eventually be able to sign in on the app and create paid programs for other users
// by giving a workout.
