import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import { addresses } from "../models/index.js";
import "dotenv/config";

// Cria dados iniciais para popular o banco de dados um pouco
async function seedAddresses() {

  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  const addresses_list = [
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.76173885239705, -2.5558823697269837]
      },
      "name": "Esc. Mul. Raimunda Brasil",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "observations": "Escola Municipal perto do Rio",
      "plusCode": "679XC6VQ+J8"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.78064802156289, -2.519089743145081]
      },
      "name": "Esc. Mul. Francisco Diogo de Melo",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679XF6J9+9P"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.65624691125134, -2.641413927009076]
      },
      "name": "Esc. Mul. Estrela da Manhã",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X985V+CF"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.60888123614359, -2.6691798085022898]
      },
      "name": "Esc. Mul. Bom Jesus",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X89JR+8C"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.60908903144659, -2.652565281109359]
      },
      "name": "Esc. Mul. Figueiredo Pimentel",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "observations": "Escola Municipal perto do Rio",
      "plusCode": "679X89WR+X9"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.57254179127108, -2.734906218712311]
      },
      "name": "Esc. Mul. Santo Antonio",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X7C8G+2X"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.5017187709265, -2.82101832077598]
      },
      "name": "Esc. Indig. Mul. Kanata T-kuya",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "observations": "Escola Indígena perto do Rio",
      "plusCode": "679X5FHX+H8"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.56913904190712, -2.7749091234796306]
      },
      "name": "Esc. Indig. Mul. Kunyata Putira",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X6CGJ+28"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.56913904190712, -2.7749091234796306]
      },
      "name": "Esc. Indig. Mul. Kunyata Putira",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X6CGJ+28"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.56913904190712, -2.7749091234796306]
      },
      "name": "Esc. Mul. São Sebastião I",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X6CGJ+28"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.451072391902166, -2.7894780137990542]
      },
      "name": "Esc. Mul. Rui Barbosa",
      "locationType": "Estabelecimento de Ensino",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X6G6X+6H"
    },
    {
      "location": {
        "type": "Point",
        "coordinates": [-60.45261898106817, -2.7905323700926417]
      },
      "locationType": "Domicílio Particular",
      "createdBy": "667ae7cf0ce0690469d0d27e",
      "project": "Projeto2024",
      "plusCode": "679X6G5W+QX"
    },
  ];

  await addresses.insertMany(addresses_list);

  await mongoose.disconnect();

}

seedAddresses().then(() => {
  console.log("Addresses seeded");
  process.exit(0);
}).catch((error) => {
  console.error("Error seeding addresses:", error);
  process.exit(1);
});