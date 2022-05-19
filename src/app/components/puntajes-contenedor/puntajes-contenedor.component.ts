import {Component, Input, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";

@Component({
  selector: 'app-puntajes-contenedor',
  templateUrl: './puntajes-contenedor.component.html',
  styleUrls: ['./puntajes-contenedor.component.sass']
})
export class PuntajesContenedorComponent implements OnInit {
  @Input() puntajes : Puntaje[]

  constructor() {
    this.puntajes = [];
  }

  ngOnInit(): void {
  }

}
