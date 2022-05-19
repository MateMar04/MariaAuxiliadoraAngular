import {Component, Input, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";

@Component({
  selector: 'app-plane-card',
  templateUrl: './plane-card.component.html',
  styleUrls: ['./plane-card.component.sass']
})
export class PlaneCardComponent implements OnInit {
  @Input() puntaje: Puntaje

  constructor() {
    this.puntaje = new Puntaje(["papa", "0", "0", "0", "0", "0", "0", "0"]);
  }

  ngOnInit(): void {
  }
}
