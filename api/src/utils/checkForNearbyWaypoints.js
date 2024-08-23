import { addresses } from "../models/index.js";

const KILOMETER = 1000;

// Essa função procura por outros endereços próximos
async function checkForNearbyWaypoints(address, maxDistanceInMeters) {
  // if(address.locationType === "Estabelecimento de Ensino") return [];

  const locationsNearby = await addresses.aggregate([
    {
      $geoNear: {
        near: address.location, // GeoJSON
        maxDistance: maxDistanceInMeters * KILOMETER, // Raio de busca do círculo 2d
        distanceField: "distance", // Campo a ser incluído na resposta
        distanceMultiplier: 1 / KILOMETER, // Converte para Quilômetros
        key: "location" // Acesso os índices de "location" definidos no Schema
      },
    },
    {
      $limit: 5 // Quantidade máxima de pontos de referência
    }
  ]);

  return locationsNearby;
}

export default checkForNearbyWaypoints;