import { AfterViewChecked, Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective implements AfterViewChecked {

  isActive = true;
  @Output()
  public loadMore = new EventEmitter<number>();

  @HostListener('scroll') onFrameScroll() {
    this.isActive = false;
    if (this.element.nativeElement.scrollTop == 0) {
      this.loadMore.emit();
      this.element.nativeElement.scrollTop = this.element.nativeElement.children[1].offsetTop;
    }
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
