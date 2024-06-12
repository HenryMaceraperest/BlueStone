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
    let totalCents = parseInt(this.currentValue, 10);
    let pounds = Math.floor(totalCents / 100);
    let pence = totalCents % 100;
    let newValue = `£${pounds}.${pence < 10 ? '00' + pence : pence}`;

    //let pounds = Math.floor(Number(this.currentValue) / 100);
    //let pence = Number((Number(this.currentValue) % 10).toFixed(2));
    //let newValue = `£${pounds}.${pence < 10 ? '0' + pence : pence}`;


      this.el.nativeElement.value = newValue;
      this.el.nativeElement.setSelectionRange(newValue.length, newValue.length);

  }
}
