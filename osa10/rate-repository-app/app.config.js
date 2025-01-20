import "dotenv/config";

export default {
  name: "rate-repository-app",
  extra: {
    env: {
      apolloUri: process.env.APOLLO_URI,
    },
  },
};
