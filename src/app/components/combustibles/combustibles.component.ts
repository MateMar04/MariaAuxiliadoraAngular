import {Component, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";
import {SheetsService} from "../../sheets.service";

@Component({
  selector: 'app-combustibles',
  templateUrl: './combustibles.component.html',
  styleUrls: ['./combustibles.component.sass']
})
export class CombustiblesComponent implements OnInit {
  puntajes: Puntaje[] = []

  constructor(private sheetsService: SheetsService) {
  }

  ngOnInit(): void {
    this.puntajes = [];
    this.sheetsService.getPuntajes().subscribe(ps => this.puntajes = ps)
  }

}
