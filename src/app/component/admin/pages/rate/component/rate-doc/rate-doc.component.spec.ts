import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDocComponent } from './rate-doc.component';

describe('PlanDocComponent', () => {
  let component: PlanDocComponent;
  let fixture: ComponentFixture<PlanDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanDocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
