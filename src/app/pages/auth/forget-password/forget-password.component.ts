import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/app/core/enums/ToasterPoitions';
import { ToasterService } from 'src/app/core/service/ToasterServices/toaster.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  resetPasswordData = {
    email: "",
  }
  isSubmitted = false;

  constructor(
  ) { }

  sendPasswordResetRequest(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isSubmitted = true;
    }
  }
}
