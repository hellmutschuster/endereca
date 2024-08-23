import express from "express";
import AddressController from "../controllers/addressController.js"; // Problema da IDE
// import paginate from "../middlewares/pagination.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  /*
  Essa rota pega todos os endereços cadastrados e devolve numa lista JSON
  */
  .get("/addresses", authMiddleware, AddressController.listAddresses)
  
  /*
  Essa rota aqui permite aplicar filtros para devolver apenas endereços que se enquadrem nos filtros. Como por
  exemplo:

  http://localhost:3666/filtered_search?name=Escola&locationType=Domicílio_Particular&project=Projeto2024
  */
  .get("/addresses/filtered_search", authMiddleware, AddressController.searchFilteredAddresses)
  
  /*
  Essa rota aqui é uma pesquisa geral em quase todos os campos de endereços

  http://localhost:3666/addresses/search?searchString=Escola
  */
  .get("/addresses/search", authMiddleware, AddressController.searchAddresses)
  
  /*
  Essa rota aqui procura um endereço pelo seu ID e retorna, se existir
  */
  .get("/addresses/:id", authMiddleware, AddressController.listAddressById)

  /*
  Essa rota aqui é responsável por criar endereços. A rota espera um request assim:

  {
    "name": "Escola Municipal Thundercats", <- Opcional
    "locationType": "Estabelecimento de Ensino",
    "createdBy": "507f191e810c19729de860ea",
    "project": "Projeto Munn Rah",
    "observations": "Thundercats, OOOOHHH!" <- Opcional,
    "plusCode": 678XXWH7+P887,
    "location": {
      "type": "Point",
      coordinates: [-45.02242, 68.32423] <- Longitude, Latitude
    }
  }
  */
  .post("/addresses", authMiddleware, AddressController.createAddress)

  /*
  Essa rota serve para atualizar um endereço, seu request é assim:

  {
    "name": "Escola Municipal Munn Rah"
  }
  */
  .put("/addresses/:id", authMiddleware, AddressController.updateAddress)

  /*
  Essa rota deleta um endereço
  */
  .delete("/addresses/:id", authMiddleware, AddressController.deleteAddress);

export default router;