export default {
  routes: [
    {
      method: "GET",
      path: "/party-slots",
      handler: "api::party-slot.party-slot.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/party-slots/:id",
      handler: "api::party-slot.party-slot.findOne",
      config: { auth: false },
    },
  ],
};
