import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WodEditorComponent } from './wod-editor.component';

describe('ClassEditorComponent', () => {
  let component: WodEditorComponent;
  let fixture: ComponentFixture<WodEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WodEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WodEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
