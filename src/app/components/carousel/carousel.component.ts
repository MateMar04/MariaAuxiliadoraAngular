import {Component, Input, OnInit} from '@angular/core';
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  @Input() equipos: Equipo[] = []

  constructor() {
  }

  ngOnInit(): void {
  }

}
