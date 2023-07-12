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

  currentUser!: User;

  constructor(public jwtHelper: JwtHelperService, private store: Store<any>, private api: ApiHttpService) { }

  ngOnInit(): void {
    this.store.select('user').subscribe((users: User) => { this.currentUser = users, console.log(users) })
  }

  GetUsers(id?: number): Observable<User[]> {
    return this.api.get('user/' + (id ? id : ''))
  }
  GetCurrentUser(): Observable<User> {
    if (!this.currentUser?.id) {
      return new Observable<User>();
    }
    return this.api.get('user/' + this.currentUser.id)
  }

  Getallgroups(): Observable<any> {
    return this.api.get("groups/getAllGroupNames");
  }
}
