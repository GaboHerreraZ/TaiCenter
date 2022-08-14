import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerComponent } from './manage-customer.component';

describe('ActivateCustomerComponent', () => {
  let component: ManageCustomerComponent;
  let fixture: ComponentFixture<ManageCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCustomerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
