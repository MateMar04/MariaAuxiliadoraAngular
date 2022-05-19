import {Component, Input, OnInit} from '@angular/core';
import {Puntaje, PuntajesMapper} from "../../models/puntajes";

@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.sass']
})
export class AvionesComponent implements OnInit {
  puntajes: Puntaje[]

  constructor() {
    this.puntajes = PuntajesMapper.toPuntajes({
      values: [
        ["PAIS", "ALAS", "FUSELAJE", "RUEDAS", "COLA", "NAFTA"],
        ["ARGENTINA", "1", "1", "2", "1", "90"],
        ["COLOMBIA", "2", "1", "2", "0", "70"],
        ["MEXICO", "3", "1", "3", "1", "80"]
      ]
    });
  }

  ngOnInit(): void {
  }

}
