import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDocComponent } from './person-doc.component';

describe('PagesComponent', () => {
  let component: PersonDocComponent;
  let fixture: ComponentFixture<PersonDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
