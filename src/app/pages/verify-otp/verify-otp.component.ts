import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToasterPosition } from 'src/app/core/enums/ToasterPoitions';
import { ToasterService } from 'src/app/core/service/ToasterServices/toaster.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  currentUser = this.authServivce.getuser()

  @Input() redirect: string = '/';
  @Input() email: string =this.currentUser.email;

  otpData = {
    otp: "",
    otptoken: ""
  };
  passwordData = {
    password: '',
    confirmPassword: ''
  }
  otpVerified = false;
  hide = true

  constructor(
    private authServivce: AuthService,
    private router: Router,
    private toast: ToasterService,
    private userservice: UserService,
  ) { }

  ngOnInit() {

    this.authServivce.sendOtp(this.email).subscribe((response) => {
      this.otpData.otptoken = response.otpToken;
      this.toast.Sucess("Sucessfull", response.message, ToasterPosition.topRight)
    }, (error) => {
      console.log(error);
      if (error.status===400) {
        this.toast.Error("There is some error", "This email is not associated")
      }
    })
  }
  VerifyOtp() {
    this.authServivce.verifyOTP(this.otpData).subscribe((data: any) => {
      this.otpVerified = data.verified
    },(error)=>{
      console.log(error);
      
    })
  }
  ChangePassword() {
    if (this.otpVerified) {
      this.authServivce.passwordReset(this.passwordData.password,this.email).subscribe((data: any) => {
        this.toast.Sucess("Sucessfull","Password updated sucessfully",ToasterPosition.topRight)
        this.otpVerified=false
        this.router.navigateByUrl(this.redirect)
      }, (error) => {
        console.log(error);
        this.toast.Error("There is some error", "plz try again after some time")
      })
    }
  }
}
