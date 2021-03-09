import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeroMagicComponent } from './top-hero-magic.component';

describe('TopHeroMagicComponent', () => {
  let component: TopHeroMagicComponent;
  let fixture: ComponentFixture<TopHeroMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeroMagicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeroMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
