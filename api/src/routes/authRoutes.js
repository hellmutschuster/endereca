import express from "express";
import authController from "../controllers/AuthController.js";

const router = express.Router();

/*

Sobre essa rota, ela serve para registrar novas contas. O aplicativo em si não possui
uma tela para registrar novas contas devido à natureza do aplicativo. Portanto, isso
deve ser feito direto pela API quando essa rota estiver habilitada.

A rota espera algo assim:

{
    "username": "ronaldinho",
    "name": "Ronaldinho Gaúcho",
    "password": "123456",
    "email": ronaldinho@semed.manaus.am.gov.br
    "profilePicture": (url para uma imagem, é opcional)
}

*/
router.post("/register", authController.register);

/*

Essa rota aqui recebe um request assim:

{
    "email": "ronaldinho@semed.manaus.am.gov.br",
    "password": "123456"
}

E devolve um token. Toda a autenticação do aplicativo é feita via token

*/

router.post("/login", authController.login);

export default router;