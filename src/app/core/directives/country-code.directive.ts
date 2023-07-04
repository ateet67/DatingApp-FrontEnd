import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { CustomvalidationService } from '../validation/customvalidation.service';

@Directive({
  selector: '[appCountryCode]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CountryCodeDirective, multi: true }]
})
export class CountryCodeDirective {

  constructor(private customValidator: CustomvalidationService, private elRef: ElementRef) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.countryCode()(control);
  }


}
