export class Puntaje {
  pais: string;
  alas: number;
  fuselaje: number;
  ruedas: number;
  cola: number;
  combustible: number;

  constructor(values: string[]) {
    this.pais = values[0];
    this.alas = Number.parseInt(values[1]);
    this.fuselaje = Number.parseInt(values[2]);
    this.ruedas = Number.parseInt(values[3]);
    this.cola = Number.parseInt(values[4]);
    this.combustible = Number.parseInt(values[5]);
  }
}


export interface GPuntajes {
  values: Array<Array<string>>
}
