import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AvionesComponent } from './components/aviones/aviones.component';
import { CombustiblesComponent } from './components/combustibles/combustibles.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TanqueComponent } from './components/tanque/tanque.component';
import { PlaneCardComponent } from './components/plane-card/plane-card.component';
import { PuntajesContenedorComponent } from './components/puntajes-contenedor/puntajes-contenedor.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AvionesComponent,
    CombustiblesComponent,
    EquiposComponent,
    TeamCardComponent,
    CarouselComponent,
    TanqueComponent,
    PlaneCardComponent,
    PuntajesContenedorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'equipos', component: EquiposComponent},
      {path: 'aviones', component: AvionesComponent},
      {path: 'combustibles', component: CombustiblesComponent},
      {path: '**', redirectTo: '/', pathMatch:'full'}
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
