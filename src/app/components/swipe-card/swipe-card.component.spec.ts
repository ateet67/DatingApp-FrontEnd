import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeCardComponent } from './swipe-card.component';

describe('SwipeCardComponent', () => {
  let component: SwipeCardComponent;
  let fixture: ComponentFixture<SwipeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwipeCardComponent]
    });
    fixture = TestBed.createComponent(SwipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
