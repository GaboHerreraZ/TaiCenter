import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalWodComponent } from './historical-wod.component';

describe('HistoricalWodComponent', () => {
  let component: HistoricalWodComponent;
  let fixture: ComponentFixture<HistoricalWodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalWodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
