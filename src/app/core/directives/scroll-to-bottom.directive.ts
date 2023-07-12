import { AfterViewChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements AfterViewChecked {

  isActive = true;

  @HostListener('scroll') onFrameScroll() {
    this.isActive = false;
  }

  constructor(private element: ElementRef) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.element && this.isActive) {
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    }
  }
}
