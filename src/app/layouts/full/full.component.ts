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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloseButtonComponent } from 'src/app/components/close-button/close-button.component';
import { SnackbarService } from 'src/app/core/service/snackbar.service';

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
    private router: Router,
    private snackBar: SnackbarService,
  ) {


  }


  ngOnInit(): void {
    this.socketservice.ConnectSocket()


    this.socket.on("notifySwipe", (response: any) => {
      console.log(response);
      if (response.status) {
        this.setCountOfNotification()
        this.snackBar.ShowSnackBar("Somebody has swiped you profile")
      }
    })
    this.socket.on("notifylike", (response: any) => {
      console.log(response);

      if (response.status) {
        this.setCountOfNotification()
        this.snackBar.ShowSnackBar("Somebody has Liked you profile")
      }
    })
    this.socket.on("notifyInvitation", (response: any) => {
      if (response.status) {
        this.setCountOfNotification()
        this.snackBar.ShowSnackBar("You got an invitation")
      }
    })
    this.socket.on("notifyAccepted", (response: any) => {
      if (response.status) {
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
    this.notificationcount++;
    this.notificationservice.SetNotificationCount(this.notificationcount);
  }
  setZeroCount(){
    this.notificationcount=0;
    this.notificationservice.SetNotificationCount(0);
  }


}
