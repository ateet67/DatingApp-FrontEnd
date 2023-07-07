import { User } from './../../../shared/interfaces/user.type';
import { Injectable, OnInit } from '@angular/core';
import { ApiHttpService } from '../api-http.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  api: ApiHttpService;
  currentUser!: User;

  constructor(http: HttpClient, public jwtHelper: JwtHelperService, private store: Store<any>) {
    this.api = new ApiHttpService(http);
  }
  ngOnInit(): void {
    this.store.select('user').subscribe((users: User) => {this.currentUser = users,console.log(users)})
  }

  GetUsers(): Observable<User[]> {
    return this.api.get('user')
  }
  GetCurrentUser(): Observable<User> {
    if (!this.currentUser?.id) {
      return new Observable<User>();
    }
    return this.api.get('user/' + this.currentUser.id)
  }
}
