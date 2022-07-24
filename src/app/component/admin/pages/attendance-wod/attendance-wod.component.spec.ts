import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceWodComponent } from './attendance-wod.component';

describe('AttendanceWodComponent', () => {
  let component: AttendanceWodComponent;
  let fixture: ComponentFixture<AttendanceWodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceWodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceWodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
