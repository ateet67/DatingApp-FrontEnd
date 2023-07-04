import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { CustomvalidationService } from '../validation/customvalidation.service';

@Directive({
  selector: '[appAlphabetsOnly]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AlphabetsOnlyDirective, multi: true }]
})
export class AlphabetsOnlyDirective {

  constructor(private customValidator: CustomvalidationService, private elRef: ElementRef) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.alphabetsOnly(this.elRef)(control);
  }

}
