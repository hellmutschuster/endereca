import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/index.js";

class AuthController {

  static register = async (req, res, next) => {
    const { name, username, email, password} = req.body;
  
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
  
    try {
      const userExists = await users.findOne({ username : username });
      if (userExists) {
        return res.status(400).json({ message: "Nome de usuário já existe." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = {
        name: name,
        username: username,
        email: email,
        password: hashedPassword
      };
      
      await users.create(user);
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static login = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }
  
    try {
      const user = await users.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "Email ou senha incorretos." });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Email ou senha incorretos." });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1000h" });

      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      console.log(error);
      next(error);
    }

  };

}

export default AuthController;