import "dotenv/config";

export default {
  name: "rate-repository-app",
  extra: {
    env: process.env.APOLLO_URI,
  },
};
