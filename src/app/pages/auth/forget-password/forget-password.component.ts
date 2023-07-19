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
  isLoading: boolean = false;
  isSubmitted = false;

  constructor(
    private authServivce: AuthService,
    private toast: ToasterService,
    private router:Router
  ) { }

  sendPasswordResetRequest(form: NgForm) {
    form.form.markAllAsTouched();

    if (form.form.valid) {
      this.isLoading = true;
      this.authServivce.SendResetPasswordLink(this.resetPasswordData.email)
        .subscribe((response: any) => {
          console.log(response);
          this.toast.Sucess("SucessFull", "Password reset link send to email",ToasterPosition.topCenter)
          this.isLoading = false
          this.isSubmitted = true;
          this.router.navigateByUrl('/auth/login')

        },
          (error) => {
            if (error.status === 400) {
              this.toast.Error("Error", "This email is not associated")
              this.isLoading = false
            }
          }
        )
    }
  }
}
