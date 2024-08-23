import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router
  // .get("/users", UserController.listUsers)
  .get("/users/:id", UserController.listUserById)

  /*
  Essa rota é usada no controlador de Auth
  */
  .post("/users", UserController.createUser);
// .put("/users/:id", UserController.updateUser)
// .delete("/users/:id", UserController.deleteUser);

export default router;