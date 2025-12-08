export default {
  routes: [
    {
      method: "GET",
      path: "/menu-items",
      handler: "api::menu-item.menu-item.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/menu-items/:id",
      handler: "api::menu-item.menu-item.findOne",
      config: { auth: false },
    },
  ],
};
