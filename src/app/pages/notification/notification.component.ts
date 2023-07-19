import { Component, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Constants } from 'src/app/config/constants';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserInvitation } from 'src/app/shared/interfaces/user-invitation.type';
import { User } from 'src/app/shared/interfaces/user.type';
import * as $ from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @Output() NotificationCountEvent = new EventEmitter()

  constructor(
    private socket: Socket,
    private notificaion: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  baseURL = Constants.SOCKET_ENDPOINT;
  profileSwipes: any = null;
  profileLikes: any = null;
  swipeLoading = true;
  likeLoading = true;
  notificaionCount: number = 0;
  invitations: any;
  startChatingButton :any

  ngOnInit(): void {
    this.RefreshNotifications()
    this.notificaion.SetNotificationCount(0)
    console.log(this.profileLikes);

    this.socket.on('notifySwipe', (response: any) => {
      if (response.status) {
        this.RefreshNotifications()
      }
    })
    this.socket.on('notifylike', (response: any) => {
      if (response.status) {
        this.RefreshNotifications()
      }
    })
    this.getInvitations();
    this.socket.on("notifyInvitation", (response: any) => {
      this.getInvitations();
    })
    this.socket.on('notifyAccepted', (data: any) => {
      console.log(data);
    })
  }

  getInvitations() {
    this.notificaion.getInvitations().subscribe((data) => {
      this.invitations = data.data;
    });
  }

  RefreshNotifications() {
    this.swipeLoading = true
    this.likeLoading = true

    this.notificaion.GetProfileSwipes().subscribe((swipes: any) => {
      this.profileSwipes = swipes;
      console.log(this.profileSwipes);
      this.swipeLoading = false
    })
    this.notificaion.GetProfileLikes().subscribe((likes: any) => {
      this.profileLikes = likes
      console.log(this.profileLikes);
      this.likeLoading = false
    })
  }

  acceptRequest(val: any, event: any) {
    let currentUser = this.authService.getuser();


    this.socket.emit('requestAccepted', {
      "name": `user${val.invited_by}user${currentUser.id}`,
      "is_active": true,
      "user_id": currentUser.id,
      "invited_by": val.invited_by
    });

    $(event.target).parents("#action_buttons").remove()
    this.startChatingButton = true

  }
  redirectToChat() {
    this.router.navigateByUrl('/dashboard/chats')
  }

  declineRequest(event: any) {
    $(event.target).parents("#action_buttons").remove()
  }
}
