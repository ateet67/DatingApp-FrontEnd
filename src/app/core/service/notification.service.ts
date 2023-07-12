import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api: ApiHttpService;
  NotificationCount: number = 0;
  ChatNotificationCount: number = 0;
  constructor(http: HttpClient, private authservice: AuthService) {
    this.api = new ApiHttpService(http);
  }

  GetProfileSwipes(): Observable<any> {
    return this.api.get('profile/swipelist?type=Right&listtype=intrested')
  }

  GetProfileLikes(): Observable<any> {
    return this.api.get('profile/likelist?listtype=intrested')
  }
  GetProfileInvitations() {
    const currentUser = this.authservice.getuser()
  }

  public get GetNotificationCount(): number {
    return this.NotificationCount
  }

  SetNotificationCount(count: number) {
    this.NotificationCount = count
  }

  getInvitations(): Observable<any> {
    // const currentUser = this.authservice.getuser()
    return this.api.get("invitations");
  }

  public get GetchatNotificationCount(): number {
    return this.ChatNotificationCount
  }
  SetChatNotificationCount(count: number) {
    this.ChatNotificationCount = count
  }
 
  GetNotifications(): Observable<any> {
    return this.api.get('user/notifications')
  }
}
