import {Component, OnInit} from '@angular/core';
import {SheetsService} from "../../sheets.service";
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.sass']
})
export class TeamsComponent implements OnInit {
  equipos: Equipo[] = []

  constructor(private equiposService: SheetsService) {
  }

  ngOnInit(): void {
    this.equipos = [];
    this.equiposService.getEquipos().subscribe(e => this.equipos = e)
  }

}
