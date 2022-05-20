import {Component, Input, OnInit} from '@angular/core';
import {Puntaje} from "../../models/puntajes";

@Component({
  selector: 'app-tanque',
  templateUrl: './tanque.component.html',
  styleUrls: ['./tanque.component.sass']
})
export class TanqueComponent implements OnInit {
  @Input() puntaje: Puntaje

  constructor() {
    this.puntaje = new Puntaje(["papa", "0", "0", "0", "0", "0", "0", "0"]);
  }

  ngOnInit(): void {
  }

}
