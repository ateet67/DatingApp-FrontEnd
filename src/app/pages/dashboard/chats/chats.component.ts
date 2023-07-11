import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Constants } from 'src/app/config/constants';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { GroupService } from 'src/app/core/service/group.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private socket: Socket) { }

  isLoading: boolean = false;
  baseURL = Constants.SOCKET_ENDPOINT;
  friends: any;
  groupnames: string[] = [];
  selectedChatingUser: any;

  ngOnInit(): void {
    this.isLoading = true;
    this.groupService.getGroups().subscribe((data: any) => {
      this.friends = data.data;
      this.friends = this.friends
        .filter((ele: any) => ele.groups != null)
        .filter((ele: any) => ele.groups = {
          ...ele.groups.users[0],
          group_id: ele.groups.id,
          group_name: ele.groups.name
        });
      this.groupnames = this.friends.map((e: any) => e.groups.group_name);
      console.log(this.groupnames);
      this.socket.emit("userOnline", this.groupnames);
      this.isLoading = false;
    })
  }

  selectionChanged() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }
}
