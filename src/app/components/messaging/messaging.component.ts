import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Constants } from 'src/app/config/constants';
import { ApiHttpService } from 'src/app/core/service/api-http.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  @Input()
  selectedUser!: any;
  baseURL = Constants.SOCKET_ENDPOINT;
  currentUserId = this.authService.getuser().id;
  message = "";
  allMessages: any;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private socket: Socket,
    private api: ApiHttpService) { }

  ngOnInit(): void {
    this.socket.on("recevieMessage", (data: any) => {
      console.log(data);

      this.allMessages.push(data.data);
    })
    this.getMessages();
  }

  getMessages() {
    this.api.post("conversation", { group_id: this.selectedUser.groups.group_id }).subscribe((data: any) => {
      console.log(data);
      this.allMessages = data.data;
      this.isLoading = false;
    })
  }

  sendMessage(form: NgForm) {
    let val = this.selectedUser.groups;

    this.socket.emit("sendMessage", {
      "group_name": val.group_name,
      "group_id": val.group_id,
      "sender": this.authService.currentUser.id,
      "message_type": "text",
      "message_text": this.message,
      "attachment_type": "text",
      "attachment_url": null,
      "is_deleted": false,
      "createdby": this.authService.currentUser.id,
      "updatedby": this.authService.currentUser.id
    })
    this.message = "";
  }
}
