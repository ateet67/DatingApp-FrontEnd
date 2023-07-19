import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from './../../config/constants';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { Socket } from 'ngx-socket-io';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { NgxPermissionsService } from 'ngx-permissions';

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
  user$: any;
  today: Date = new Date();
  userImage: string = 'assets/images/user2.webp'
  baseUrl = Constants.SOCKET_ENDPOINT;

  profileSwipes: any;
  notificationcount: number = 0;
  chatNotificationCount: number = this.notificationservice.GetchatNotificationCount;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  // serverUrl: string = Constants.SOCKET_ENDPOINT;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private authservice: AuthService,
    private socketservice: SocketService,
    private socket: Socket,
    private notificationservice: NotificationService,
    private router: Router,
    private snackBar: SnackbarService,
    private userService: UserService,
    private permissionsService: NgxPermissionsService
  ) {


  }


  ngOnInit(): void {
    let user = this.authservice.getuser();
    const perm = [user.role.name];
    this.permissionsService.loadPermissions(perm);


    this.user$ = this.authservice.getuser()
    this.socketservice.ConnectSocket()

    this.notificationservice.GetNotifications().subscribe((data) => {
      this.notificationcount = data.data.length;
    })

    this.socket.on("notifySwipe", (response: any) => {
      console.log(response);
      if (response.status) {
        if (this.router.url !== "/dashboard/notification") {
          this.setCountOfNotification()
        }
        this.snackBar.ShowSnackBar("Somebody has swiped you profile")
      }
    })
    this.socket.on("notifylike", (response: any) => {
      console.log(response);

      if (response.status) {
        if (this.router.url !== "/dashboard/notification") {
          this.setCountOfNotification()
        }
        this.snackBar.ShowSnackBar("Somebody has Liked you profile")
      }
    })
    this.socket.on("notifyInvitation", (response: any) => {
      if (response.status) {
        if (this.router.url !== "/dashboard/notification") {
          this.setCountOfNotification()
        }
        this.snackBar.ShowSnackBar("You got an invitation")
      }
    })
    this.socket.on("notifyAccepted", (response: any) => {
      if (response.status) {
        this.setCountOfNotification()
      }
    })
    this.socket.on("recevieMessage", (response: any) => {

      if (response.status && response.data.sender !== this.user$.id && this.router.url !== "/dashboard/chats") {
        this.setChatCountOfNotification()
      }
    })
    this.getOnline();
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
    },
  ];
  adminBar: sidebarMenu[] = [
    {
      link: "/admin/prefrences",
      icon: "list",
      menu: "Preferences",
    },
    {
      link: "/admin/userList",
      icon: "users",
      menu: "Users",
    }
  ]

  onLogout() {
    localStorage.clear();
    this.socket.disconnect();
    this.permissionsService.flushPermissions();
    this.router.navigateByUrl("/");
  }


  setCountOfNotification() {
    this.notificationcount++;
    this.notificationservice.SetNotificationCount(this.notificationcount);
  }
  setChatCountOfNotification() {
    this.chatNotificationCount++;
    this.notificationservice.SetChatNotificationCount(this.chatNotificationCount);
  }
  ResetNotifications() {
    this.notificationcount = 0;
    this.notificationservice.SetNotificationCount(0);
    this.socket.emit("sendSeen", this.user$.id)
  }
  ResetChatNotification() {
    this.chatNotificationCount = 0;
    this.notificationservice.SetChatNotificationCount(this.chatNotificationCount);
  }


  getOnline() {
    this.userService.Getallgroups().subscribe((data) => {
      let groups = data.data.map((e: any) => e.name);
      this.socket.emit("userOnline", groups);
    })
  }
}
