import {Component, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";
import {PuntajesService} from "../../puntajes.service";

@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.sass']
})
export class AvionesComponent implements OnInit {
  puntajes: Puntaje[] = []

  constructor(private puntajesService: PuntajesService) {

  }

  ngOnInit(): void {
    this.puntajes = [];
    this.puntajesService.getPuntajes().subscribe(ps => this.puntajes = ps)
  }

}
