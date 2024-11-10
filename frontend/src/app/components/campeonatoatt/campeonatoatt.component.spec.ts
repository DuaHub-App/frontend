import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampeonatoattComponent } from './campeonatoatt.component';

describe('CampeonatoattComponent', () => {
  let component: CampeonatoattComponent;
  let fixture: ComponentFixture<CampeonatoattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampeonatoattComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampeonatoattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
