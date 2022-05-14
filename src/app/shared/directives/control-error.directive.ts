import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appControlError]',
})
export class ControlErrorDirective {
  constructor(
    private control: NgControl,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('blur', ['$event'])
  onBlur(event: KeyboardEvent) {
    this.validateControl();
  }

  validateControl() {
    console.log('control', this.control);
    let css = `border: solid #e60017; border-width: 1px 1px 1px 3px;`;
    if (this.control.invalid) {
      console.log('error');
      this.renderer.addClass(this.el.nativeElement, 'custom-error');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'custom-error');
    }
  }
}
