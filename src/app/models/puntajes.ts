export class Puntaje {
  pais: Pais;
  alas: number;
  fuselaje: number;
  ruedas: number;
  cola: number;
  combustible: number;
  motor: number;
  pasaporte: number;

  constructor(values: string[]) {
    this.pais = new Pais(values[0]);
    this.alas = Number.parseInt(values[1]);
    this.fuselaje = Number.parseInt(values[2]);
    this.ruedas = Number.parseInt(values[3]);
    this.cola = Number.parseInt(values[4]);
    this.combustible = Number.parseInt(values[5]);
    this.motor = Number.parseInt(values[6])
    this.pasaporte = Number.parseInt(values[7])
  }
}

export class Pais {
  public flagImage: string
  constructor(public nombre: string) {
    this.flagImage = nombre.replace(" ", "-").toLowerCase() + ".svg"
  }
}
