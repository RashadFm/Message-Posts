import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  @Input('appInputRestriction') maxLength: number;

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input')
  onInput(): void {
    const value = this.el.nativeElement.value;

    if (!value) {
      this.control.control.patchValue('', { emitEvent: false });
    } else if (value.length > this.maxLength) {
      const truncatedValue = value.substr(0, this.maxLength);
      this.control.control.patchValue(truncatedValue, { emitEvent: false });
    }
  }
}

