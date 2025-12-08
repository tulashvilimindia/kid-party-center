export default {
  routes: [
    {
      method: "GET",
      path: "/gallery-images",
      handler: "api::gallery-image.gallery-image.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/gallery-images/:id",
      handler: "api::gallery-image.gallery-image.findOne",
      config: { auth: false },
    },
  ],
};
