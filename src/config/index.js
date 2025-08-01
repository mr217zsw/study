const env = import.meta.env.MODE || "production";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi: "https://localhost:5173/api",
  },
  test: {
    baseApi: "/api",
    mockApi: "https://xxx",
  },
  production: {
    baseApi: "/api",
    mockApi: "https://xxx",
  },
};

export default {
  env,
  ...EnvConfig[env],
  mock: true,
};
