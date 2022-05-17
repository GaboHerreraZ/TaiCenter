import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDocComponent } from './reserve-doc.component';

describe('ReserveDocComponent', () => {
  let component: ReserveDocComponent;
  let fixture: ComponentFixture<ReserveDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
