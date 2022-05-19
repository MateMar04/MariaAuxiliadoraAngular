import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PuntajesContenedorComponent} from './puntajes-contenedor.component';

describe('PuntajesContenedorComponent', () => {
  let component: PuntajesContenedorComponent;
  let fixture: ComponentFixture<PuntajesContenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PuntajesContenedorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajesContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
