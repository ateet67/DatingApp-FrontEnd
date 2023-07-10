import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private socket: Socket) {

  }

  users: any = [{}];
  selectedChatingUser: any;

  ngOnInit(): void {
    this.userService.GetUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  message = "";

  sendMessage(form: NgForm) {
    console.log(form);

    this.socket.emit("sendMessage", {
      "group_name": 'grouppData.name',
      "group_id": 'grouppData.id',
      "sender": this.authService.currentUser.id,
      "message_type": "text",
      "message_text": this.message,
      "attachment_type": "text",
      "attachment_url": null,
      "is_deleted": false,
      "createdby": this.authService.currentUser.id,
      "updatedby": this.authService.currentUser.id
    })
  }

  inviteUser(id: number) {
    this.socket.emit('sendInvitation', {
      "isActive": true,
      "isAccepted": false,
      "invited_by": this.authService.currentUser.id,
      "invited_to": id,
      "updated_by": this.authService.currentUser.id
    });
  }
}
