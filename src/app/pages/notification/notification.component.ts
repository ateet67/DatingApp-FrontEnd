import { Component, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { NotificationService } from 'src/app/core/service/notification.service';
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

  profileSwipes: any=null;
  isloading = true;
  notificaionCount:number=0

  ngOnInit(): void {
    this.RefreshNotifications()
    this.notificaion.SetNotificationCount(this.profileSwipes.swipeList.length)
    this.socket.on('notifySwipe', (response: any) => {
      console.log(response);
      if (response.status) {
        this.RefreshNotifications()
      }
    })
  }
  RefreshNotifications() {
    this.isloading = true
    this.notificaion.GetProfileSwipes().subscribe((swipes: any) => {
      this.profileSwipes = swipes
      console.log(this.profileSwipes);
      this.isloading = false
    })
  }

}
