export default {
  routes: [
    {
      method: "GET",
      path: "/site-setting",
      handler: "api::site-setting.site-setting.find",
      config: { auth: false },
    },
  ],
};
