import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveConfigurationComponent } from './reserve-configuration.component';

describe('ReserveConfigurationComponent', () => {
  let component: ReserveConfigurationComponent;
  let fixture: ComponentFixture<ReserveConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
