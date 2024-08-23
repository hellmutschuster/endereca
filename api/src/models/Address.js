import mongoose from "mongoose";
import checkIfValidGeoCoords from "../utils/checkIfValidGeoCoords.js";

let addressSchema = new mongoose.Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String,
    },
    locationType : { // Tipo
      type: String,
      enum: [
        "Domicílio Particular",
        "Domicílio Coletivo",
        "Estabelecimento Agropecuário",
        "Estabelecimento de Ensino",
        "Estabelecimento de Saúde",
        "Estabelecimento Religioso",
        "Estabelecimento Outros",
        "Edificação em Construção"
      ],
      required: [true, "O tipo do endereço é obrigatório"]
    },
    createdAt: { // Data do Cadastro, pensando se seria melhor usar unix timestamps...
      type: Date,
      default: Date.now,
    },
    createdBy: { // Cadastrador
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    project: { // Projeto
      type: String,
      required: true
    },
    observations: {
      type: String
    },
    plusCode: { // Plus Code associado ao Endereço. É calculado a partir das coordenadas
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // GeoJSON -> longitude, latitude
        required: true,
        validate: {
          validator: (value) => {
            return checkIfValidGeoCoords(value);
          },
          message: "O valor inserido {VALUE} não é um par de coordenadas válidas"
        }
      }
    }
  },
  {
    versionKey: false
  }
);

addressSchema.pre("save", function(next){
  const now = new Date();
  this.updated_at = now;
  if(!this.created_at) {
    this.created_at = now;
  }
  next();
});

addressSchema.index({ location: "2dsphere" });

const addresses = mongoose.model("addresses", addressSchema);

export default addresses;