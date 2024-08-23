import mongoose from "mongoose";
import checkIfOrganizationEmail from "../utils/checkIfOrganizationEmail.js";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String,
      required: [true, "O seu nome é obrigatório"]
    },
    username : {
      type: String,
      required: [true, "O nome de usuário é obrigatório"]
    },
    email: {
      type: String,
      required: [true, "O email da SEMED é obrigatório"],
      validate: {
        validator: (value) => {
          return checkIfOrganizationEmail(value);
        },
        message: "Só é possível registrar emails da SEMED"
      }
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória"]
    },
    profilePicture: {
      type: String,
    }
  },
  {
    versionKey: false
  }
);

const users = mongoose.model("users", userSchema);

export default users;