import { Constants } from './../../config/constants';
import { getUser } from './../../core/store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/core/service/auth.service';
import { User } from 'src/app/shared/interfaces/user.type';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { Socket } from 'ngx-socket-io';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  search: boolean = false;
  user$: User = this.authservice.getuser();
  today: Date = new Date();

  profileSwipes: any;
  notificationcount: number = this.notificationservice.GetNotificationCount;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  serverUrl: string = Constants.SOCKET_ENDPOINT;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private authservice: AuthService,
    private socketservice: SocketService,
    private socket: Socket,
    private notificationservice: NotificationService,
    private router: Router
  ) {


  }


  ngOnInit(): void {
    this.socketservice.ConnectSocket()
    this.socket.on("notifySwipe", (response: any) => {
      if (response.staus) {
        this.setCountOfNotification()
      }
    })
    this.socket.on("notifylike", (response: any) => {
      if (response.staus) {
        this.setCountOfNotification()
      }
    })
    this.socket.on("notifyInvitation", (response: any) => {
      if (response.staus) {
        this.setCountOfNotification()
      }
    })
    this.socket.on("notifyAccepted", (response: any) => {
      if (response.staus) {
        this.setCountOfNotification()
      }
    })


  }


  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboard/home",
      icon: "home",
      menu: "Home",
    },
    {
      link: "/dashboard/chats",
      icon: "message-circle",
      menu: "Chats",
    }
  ];

  onLogout() {
    this.router.navigateByUrl("/");
    localStorage.clear();
  }


  setCountOfNotification() {
    this.notificationcount++
    this.notificationservice.SetNotificationCount(this.notificationcount)
  }
  setZeroCount(){
    this.notificationcount=0;
    this.notificationservice.SetNotificationCount(0)
  }


}
