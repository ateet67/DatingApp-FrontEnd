import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPreferenceComponent } from './add-new-preference.component';

describe('AddNewPreferenceComponent', () => {
  let component: AddNewPreferenceComponent;
  let fixture: ComponentFixture<AddNewPreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPreferenceComponent]
    });
    fixture = TestBed.createComponent(AddNewPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
