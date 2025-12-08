export default {
  routes: [
    {
      method: "GET",
      path: "/packages",
      handler: "api::package.package.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/packages/:id",
      handler: "api::package.package.findOne",
      config: { auth: false },
    },
  ],
};
