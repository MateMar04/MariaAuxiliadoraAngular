import {Component, Input, OnInit} from '@angular/core';
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  @Input() equipos: Equipo[];
  slides: Array<Equipo[]> = new Array<Equipo[]>();
  slideSize: number = 3;

  constructor() {
    this.equipos = [];
  }

  getSlide(slideIndex: number): Equipo[] {
    let start = slideIndex * this.slideSize;
    return this.equipos.slice(start, start + this.slideSize);
  }

  numberOfSlides(): number {
    return Math.ceil(this.equipos.length / this.slideSize);
  }

  nextSlide() {
  }

  previousSlide() {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.numberOfSlides(); i++) {
      this.slides.push(this.getSlide(i))
    }
  }
}
