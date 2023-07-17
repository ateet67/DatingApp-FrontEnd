import { User } from './../../../shared/interfaces/user.type';
import { Injectable, OnInit } from '@angular/core';
import { ApiHttpService } from '../api-http.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileInfo } from 'src/app/shared/models/profileinfo.model';
import { Ethnicity } from 'src/app/shared/interfaces/ethnicity.type';

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
  GetProfileInfo(): Observable<any> {
    return this.api.get('profile/profileinfo');
  }





  UpdatePersonalInfo(userdata: ProfileInfo): Observable<any> {
    return this.api.put('profile/update', userdata)
  }
  UpdateEthnicity(ethnicity: Array<Ethnicity>): Observable<any> {
    console.log(ethnicity);
    
    return this.api.put("profile/ethnicity/update", { ethnicity });
  }
  UpdateProfession(profession: any): Observable<any> {
    return this.api.put("profile/profession/update", { profession });
  }
  UpdateFoodanddrink(foodanddrink: any): Observable<any> {
    return this.api.put("profile/foodanddrink/update", { foodanddrink });
  }
  UpdateGoingout(goingout: any): Observable<any> {
    return this.api.put("profile/goingout/update", { goingout });
  }
  UpdateHobby(hobbies: any): Observable<any> {
    return this.api.put("profile/hobbies/update", { hobbies });
  }
  UpdateSocialProfile(socialProfiles: any): Observable<any> {
    return this.api.put("profile/social_profile/update", { socialProfiles });
  }
}
