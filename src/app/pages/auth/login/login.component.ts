import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/service/auth.service';
import { setUser } from 'src/app/core/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginData = {
    email: "bumble8@gmail.com",
    password: "password123"
  }

  isLoading: boolean = false;

  constructor(private authServivce: AuthService, private store: Store, private router: Router) {

  }


  login(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isLoading = true;
      this.authServivce.login(this.loginData.email, this.loginData.password).subscribe(
        (data: any) => {
          console.log(data);
          if (data.status) {
            this.isLoading =false;
            localStorage.setItem("token", data.user.token);
            this.store.dispatch(setUser({ user: data.user }));
            setTimeout(() => {
              console.log(data);
              this.router.navigateByUrl('/dashboard')
            }, 500);
          }
        },
        (err: any) => {
          this.isLoading = false;
          setTimeout(() => {
            console.log(err.error);
          }, 1000);
        })
    }
  }
}
