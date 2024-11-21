import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCampeonatoComponent } from './menu-campeonato.component';

describe('MenuCampeonatoComponent', () => {
  let component: MenuCampeonatoComponent;
  let fixture: ComponentFixture<MenuCampeonatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCampeonatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
