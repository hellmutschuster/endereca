import mongoose from "mongoose";

// Previne que qualquer campo string seja fornecido em branco
// Para campos opcionais, se nada for inserido na tela de registro, ele vai considerar
// como "não preenchido", mas se tiver espaços em branco, aí sim dispara o aviso de
// campo em branco
mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});