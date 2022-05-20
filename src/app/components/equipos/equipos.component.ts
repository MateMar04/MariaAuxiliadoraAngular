import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../equipos.service";
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.sass']
})
export class EquiposComponent implements OnInit {
  equipos: Equipo[] = []

  constructor(private equiposService: EquiposService) {
  }

  ngOnInit(): void {
    this.equipos = [];
    this.equiposService.getEquipos().subscribe(e => this.equipos = e)
  }

}
