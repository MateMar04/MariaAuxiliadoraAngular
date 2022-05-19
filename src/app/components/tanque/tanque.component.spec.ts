import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TanqueComponent} from './tanque.component';

describe('TanqueComponent', () => {
  let component: TanqueComponent;
  let fixture: ComponentFixture<TanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TanqueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
