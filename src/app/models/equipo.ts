import {Pais} from "./puntajes";

export class Equipo {
  pais: Pais;
  embajador: string;
  piloto: string;
  tripulacion: string[];

  constructor(values : string[]) {
    this.pais = new Pais(values[0]);
    this.embajador = values[1];
    this.piloto = values[2];
    this.tripulacion = values[3].split("\n")
  }
}
