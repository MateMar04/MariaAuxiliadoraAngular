import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneCardComponent } from './plane-card.component';

describe('PlaneCardComponent', () => {
  let component: PlaneCardComponent;
  let fixture: ComponentFixture<PlaneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
