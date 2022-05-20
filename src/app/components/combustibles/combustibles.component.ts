import {Component, OnInit} from '@angular/core';
import {PuntajesService} from "../../puntajes.service";
import {Puntaje} from "../../models/puntajes";

@Component({
  selector: 'app-combustibles',
  templateUrl: './combustibles.component.html',
  styleUrls: ['./combustibles.component.sass']
})
export class CombustiblesComponent implements OnInit {
  puntajes: Puntaje[] = []

  constructor(private puntajesService: PuntajesService) {
  }

  ngOnInit(): void {
    this.puntajes = [];
    this.puntajesService.getPuntajes().subscribe(ps => this.puntajes = ps)
  }

}
