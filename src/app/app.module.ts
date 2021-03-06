import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {PlanesComponent} from './components/planes/planes.component';
import {CombustiblesComponent} from './components/combustibles/combustibles.component';
import {TeamsComponent} from './components/teams/teams.component';
import {TeamCardComponent} from './components/team-card/team-card.component';
import {TanqueComponent} from './components/tanque/tanque.component';
import {PlaneCardComponent} from './components/plane-card/plane-card.component';
import {PuntajesContenedorComponent} from './components/puntajes-contenedor/puntajes-contenedor.component';
import {WorkingComponent} from './components/working/working.component';
import {ReglamentoComponent} from './components/reglamento/reglamento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanesComponent,
    CombustiblesComponent,
    TeamsComponent,
    TeamCardComponent,
    TanqueComponent,
    PlaneCardComponent,
    PuntajesContenedorComponent,
    WorkingComponent,
    ReglamentoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'equipos', component: TeamsComponent},
      {path: 'aviones', component: PlanesComponent},
      {path: 'combustibles', component: CombustiblesComponent},
      {path: 'reglas', component: ReglamentoComponent},
      {path: '**', redirectTo: '/', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
