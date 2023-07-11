import { Injectable, OnInit } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.type';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { User as UserModel } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  api: ApiHttpService;
  currentUser!: User;

  constructor(http: HttpClient, public jwtHelper: JwtHelperService, private store: Store<any>) {
    console.log("cunstructer");
    this.api = new ApiHttpService(http);
  }

  registerUser(userData: User): Observable<User> {
    return this.api.post("auth/register", userData);
  }

  verifyOTP(otpData: any): Observable<{ [key: string]: boolean }> {
    return this.api.post("auth/verifyotp", otpData);
  }

  login(email: string, password: string): Observable<User> {
    return this.api.post("auth/login", { email, password });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getuser(): any {
    this.store.select('user').subscribe((user) => {this.currentUser = user})
    return this.currentUser ?? null;
  }
  

  SendResetPasswordLink(email:string): Observable<any> {
    return this.api.post("auth/passwordreset", { email })
  }
}
