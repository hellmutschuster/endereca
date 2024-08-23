import NotFound from "../errors/NotFound.js";
import { addresses, users } from "../models/index.js";
import checkForNearbyWaypoints from "../utils/checkForNearbyWaypoints.js";

// O populate serve para substituir o ID no campo "createdBy pelo objeto com as informações de quem cadastrou"

class AddressController {

  static listAddresses = async (req, res, next) => {
    try {
      const addressesResult = await addresses.find().populate("createdBy");

      req.result = addressesResult;

      // next(); // A paginação quebra muito fácil, então tive que tirar por enquanto

      res.status(200).json(addressesResult);
    } catch (error) {
      next(error);
    }
  };

  static listAddressById = async (req, res, next) => {
    try {
      const id = req.params.id;

      let addressResult = await addresses.findById(id)
        .lean() // Isso aqui converte o objeto do Mongoose (imutável) para um do javascript (mutável)
        .populate("createdBy")
        .exec();

      if (addressResult !== null) {

        // Aqui ele adiciona um campo com até 5 endereços próximos, com um raio de 10 quilômetros
        addressResult.nearbyWaypoints = await checkForNearbyWaypoints(addressResult, 10);

        res.status(200).send(addressResult);
      } else {
        next(new NotFound("Id do Endereço não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static createAddress = async (req, res, next) => {
    try {
      let address = new addresses(req.body);

      const addressResult = await address.save();

      res.status(201).send(addressResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAddress = async (req, res, next) => {
    try {
      const id = req.params.id;

      const addressResult = await addresses.findByIdAndUpdate(id, {$set: req.body});

      if (addressResult !== null) {
        res.status(200).send({message: "Endereço atualizado com sucesso"});      
      } else {
        next(new NotFound("Id do Usuário não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteAddress = async (req, res, next) => {
    try {
      const id = req.params.id;

      const addressResult = addresses.findByIdAndDelete(id);

      if (addressResult !== null) {
        res.status(200).send({message: "Endereço removido com sucesso"});      
      } else {
        next(new NotFound("Id do Endereço não localizado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static searchAddresses = async (req, res, next) => {
    try {
      const { searchString } = req.query;

      if (searchString) {
        const searchResult = await searchInAllFields(searchString);

        // req.result = searchResult;

        res.status(200).json(searchResult);
      } else { // Ou seja, se a string de pesquisa for vazia, simplesmente retorna todos os endereços
        const addressesResult = await addresses.find().populate("createdBy");

        // req.result = addressesResult;
        // next();

        res.status(200).json(addressesResult);
      }
    } catch (error) {
      next(error);
    }
  };


  static searchFilteredAddresses = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);

      if(search !== null) {
        const addressesResult = await addresses
          .find(search)
          .populate("createdBy");

        // req.result = addressesResult;
        // next();

        res.status(200).json(addressesResult);
      }
    }
    catch (error) {
      next(error);
    }

  };

}

async function searchInAllFields(searchString) {
  const regex = new RegExp(searchString, "i"); // 'i' para case insensitive

  const searchQuery = [
    { name: regex },
    { locationType: regex },
    // { createdAt: regex },
    { project: regex },
    { observations: regex },
    { plusCode: regex },
  ];

  // Aqui ele procura no banco o ID de quem cadastrou, baseado no nome dado
  const checkForUserId = await users.findOne({ name: regex }); 

  if(checkForUserId) { // Aqui ele modifica a query de pesquisa para colocar o nome de quem cadastrou
    searchQuery.push({createdBy: checkForUserId._id});
  }

  const searchResult = await addresses.find().or(searchQuery).populate("createdBy");

  return searchResult;
}


async function processSearch(parameters) {
  const { name, locationType, createdAt, createdBy, project, observations} = parameters;
  let { plusCode } = parameters;
  let search = {};

  if(name) search.name = name;
  if(locationType) search.locationType = locationType;
  if(createdAt) search.createdAt = createdAt;
  if(project) search.project = project;
  if(observations) search.observations = observations;

  if(plusCode) { // Isso aqui serve para que o sinal de + não quebre a URL
    search.plusCode = plusCode;
    plusCode = plusCode.replace(/ /g, "+");
  }

  if(createdBy) { // Aqui ele procura no banco o ID de quem cadastrou, baseado no nome dado
    const regex = new RegExp(createdBy, "i");
    const user = await users.findOne({name: regex});
      
    if(user !== null) {
      search.createdBy = user._id;
    } else {
      search = null;
    }
    
  }

  return search;
}

export default AddressController;