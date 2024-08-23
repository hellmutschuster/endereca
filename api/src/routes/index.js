import express from "express";
import users from "./usersRoutes.js";
import addresses from "./addressesRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({message: "Endereça"});
  });

  app.use(
    express.json(),
    users,
    addresses,
    auth
  );
};

export default routes;