import { Directive, HostListener, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormatter]'
})
export class CurrencyFormatterDirective {

  private currentValue: string = '0.0';

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let inputChar = event.data;

    if (event.inputType === 'deleteContentBackward') {
      let numValue = this.currentValue.replace('£', '').replace('.', '');
      if (numValue.length < 4) {
        this.currentValue = '0' + this.currentValue.slice(0, -1);
      } else {
        this.currentValue = this.currentValue.slice(0, -1);
      }
    } else if (inputChar && !isNaN(inputChar)) {
      this.currentValue = this.currentValue.replace('£', '').replace('.', '');
      this.currentValue += inputChar;
    }
    if (this.currentValue.length > 3 && this.currentValue.startsWith('0')) {
      this.currentValue = this.currentValue.slice(1);
    }
      let pounds = this.currentValue.slice(0, -2);
      let pence = this.currentValue.slice(-2);
      let newValue = `£${pounds}.${pence}`;

      this.el.nativeElement.value = newValue;
      this.el.nativeElement.setSelectionRange(newValue.length, newValue.length);

  }
}
