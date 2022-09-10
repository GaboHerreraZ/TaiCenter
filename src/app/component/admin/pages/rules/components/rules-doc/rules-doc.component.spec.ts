import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesDocComponent } from './rules-doc.component';

describe('RulesDocComponent', () => {
  let component: RulesDocComponent;
  let fixture: ComponentFixture<RulesDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
