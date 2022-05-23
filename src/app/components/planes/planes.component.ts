import {Component, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";
import {SheetsService} from "../../sheets.service";

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.sass']
})
export class PlanesComponent implements OnInit {
  puntajes: Puntaje[] = []

  constructor(private sheetsService: SheetsService) {

  }

  ngOnInit(): void {
    this.puntajes = [];
    this.sheetsService.getPuntajes().subscribe(ps => this.puntajes = ps)
  }

}
