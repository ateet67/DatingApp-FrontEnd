import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { CustomvalidationService } from '../validation/customvalidation.service';

@Directive({
  selector: '[appNumbersOnly]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumbersOnlyDirective, multi: true }]
})
export class NumbersOnlyDirective {

  constructor(private customValidator: CustomvalidationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.numbersOnly()(control);
  }

}
