import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarProfesorComponent } from './mostrar-profesor.component';

describe('MostrarProfesorComponent', () => {
  let component: MostrarProfesorComponent;
  let fixture: ComponentFixture<MostrarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
