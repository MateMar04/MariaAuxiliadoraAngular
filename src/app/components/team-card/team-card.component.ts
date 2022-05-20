import {Component, Input, OnInit} from '@angular/core';
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.sass']
})
export class TeamCardComponent implements OnInit {
  @Input() equipo : Equipo

  constructor() {
    this.equipo = new Equipo(["", "", "", ""])
  }

  ngOnInit(): void {
  }

}
