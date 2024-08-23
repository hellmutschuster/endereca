import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import { users } from "../models/index.js";
import "dotenv/config";

// Cria dados iniciais para popular o banco de dados um pouco
async function seedUsers() {

  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  const user = {
    name: "Hellmut Schuster",
    username: "hellmutschuster",
    email: "hellmut.schuster@semed.manaus.am.gov.br",
    password: "123456"
  };

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
  // adminCredentials.password = hashedPassword;

  // Create admin user
  await users.create(user);

  await mongoose.disconnect();

}

seedUsers().then(() => {
  console.log("Users seeded");
  process.exit(0);
}).catch((error) => {
  console.error("Error seeding users:", error);
  process.exit(1);
});