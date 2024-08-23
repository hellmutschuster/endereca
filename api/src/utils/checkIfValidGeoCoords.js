const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

// Recebe uma lista [lon, lat] e retorna verdadeiro se são coordenadas válidas
// Como o formato usado no banco é o GeoJSON, longitude vem primeiro
function checkIfValidGeoCoords(coordinates) {
  let validLat = regexLat.test(coordinates[1]);
  let validLon = regexLon.test(coordinates[0]);
  return validLat && validLon;
}

export default checkIfValidGeoCoords;