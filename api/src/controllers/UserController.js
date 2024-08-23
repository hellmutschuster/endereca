import NotFound from "../errors/NotFound.js";
import { users } from "../models/index.js";

class UserController {

  static listUsers = async (req, res, next) => {
    try {
      const usersResult = await users.find();

      // req.result = usersResult;

      res.status(200).send(usersResult);
    } catch (error) {
      next(error);
    }
  };

  static listUserById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResult = await users.findById(id);

      if (userResult !== null) {
        userResult.password = undefined;
        res.status(200).send(userResult);
      } else {
        next(new NotFound("Id do Usuário não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static createUser = async (req, res, next) => {
    try {
      let user = new users(req.body);

      const userResult = await user.save();

      res.status(201).send(userResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResult = await users.findByIdAndUpdate(id, {$set: req.body});

      if (userResult !== null) {
        res.status(200).send({message: "Usuário atualizado com sucesso"});      
      } else {
        next(new NotFound("Id do Usuário não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResult = users.findByIdAndDelete(id);

      if (userResult !== null) {
        res.status(200).send({message: "Usuário removido com sucesso"});      
      } else {
        next(new NotFound("Id do Usuário não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

}

export default UserController;