import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiferCampeonatoComponent } from './qualifer-campeonato.component';

describe('QualiferCampeonatoComponent', () => {
  let component: QualiferCampeonatoComponent;
  let fixture: ComponentFixture<QualiferCampeonatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualiferCampeonatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualiferCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
