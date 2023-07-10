import { Component, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UserInvitation } from 'src/app/shared/interfaces/user-invitation.type';
import { User } from 'src/app/shared/interfaces/user.type';

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
  ) {
  }

  profileSwipes: any = null;
  profileLikes: any = null;
  swipeLoading = true;
  likeLoading = true;
  notificaionCount: number = 0;
  invitations: UserInvitation[] = [];

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


}
