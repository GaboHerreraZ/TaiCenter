import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { addDays, differenceInDays } from 'date-fns';

@Directive({
  selector: '[dateColor]',
})
export class DateColorDirective implements AfterViewInit {
  @Input('dateColor') date: Date;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const currentDate = new Date();
    const beforeDate = addDays(new Date(), 7);
    if (differenceInDays(this.date, currentDate) === 0) {
      this.el.nativeElement.style.color = 'white';
      this.el.nativeElement.style.background = 'red';
      return;
    }

    if (beforeDate > this.date) {
      this.el.nativeElement.style.color = 'black';
      this.el.nativeElement.style.background = '#ffd8b2';
      return;
    }
  }
}
