import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterRuleComponent } from './center-rule.component';

describe('CenterRuleComponent', () => {
  let component: CenterRuleComponent;
  let fixture: ComponentFixture<CenterRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
