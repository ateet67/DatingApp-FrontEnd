import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAutoCompleteComponent } from './app-auto-complete.component';

describe('AppAutoCompleteComponent', () => {
  let component: AppAutoCompleteComponent;
  let fixture: ComponentFixture<AppAutoCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAutoCompleteComponent]
    });
    fixture = TestBed.createComponent(AppAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
