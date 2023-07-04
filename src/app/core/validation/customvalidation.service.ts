import { ElementRef, Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? {} : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): any => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return {};
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return {};
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve({});
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }

  alphabetsOnly(elRef: ElementRef): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^[a-zA-Z ]*$');
      const valid = regex.test(control.value);

      // if ((control.touched && !valid) || (control.dirty && !valid)) {
      //   const el = elRef.nativeElement as HTMLElement;
      //   const p = document.createElement('p');
      //   p.textContent = 'Inserted Div';
      //   p.classList.add("text-danger")
      //   // any other styling
      //   elRef.nativeElement.parentNode.insertBefore(p, el.nextSibling);
      // }
      return valid ? {} : { invalid: true };
    };
  }

  alphaNumeric(elRef: ElementRef): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = new RegExp('^[a-z0-9]+$');
      const valid = regex.test(control.value);

      // if ((control.touched && !valid) || (control.dirty && !valid)) {
      //   const el = elRef.nativeElement as HTMLElement;
      //   const p = document.createElement('p');
      //   p.textContent = 'Inserted Div';
      //   p.classList.add("text-danger")
      //   // any other styling
      //   elRef.nativeElement.parentNode.insertBefore(p, el.nextSibling);
      // }
      return valid ? {} : { invalid: true };
    };
  }

  countryCode(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = /^(\+?\d{1,3}|\d{1,4})$/gm;
      const valid = regex.test(control.value);
      return valid ? {} : { invalid: true };
    };
  }

  numbersOnly(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {};
      }
      const regex = /^\d+$/;
      const valid = regex.test(control.value);
      return valid ? {} : { invalid: true };
    };
  }


}