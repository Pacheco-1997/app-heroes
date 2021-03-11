import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoHeroesComponent } from './grupo-heroes.component';

describe('GrupoHeroesComponent', () => {
  let component: GrupoHeroesComponent;
  let fixture: ComponentFixture<GrupoHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoHeroesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
