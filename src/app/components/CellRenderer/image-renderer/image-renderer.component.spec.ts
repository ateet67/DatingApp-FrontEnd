import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRendererComponent } from './image-renderer.component';

describe('ImageRendererComponent', () => {
  let component: ImageRendererComponent;
  let fixture: ComponentFixture<ImageRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageRendererComponent]
    });
    fixture = TestBed.createComponent(ImageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
