import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  isOnline: boolean = false;
  isTyping: boolean = false;
  @ViewChild('content') content!: ElementRef;
  timeout: any;

  constructor(
    private authService: AuthService,
    private socket: Socket,
    private api: ApiHttpService) { }

  ngOnInit(): void {
    this.isOnline = this.selectedUser.groups.is_online || false;
    this.socket.on("recevieMessage", (data: any) => {
      this.allMessages.push(data.data);
      this.scrollTobottom();
    });
    this.socket.on("userisOnline", (data: any) => {
      this.isOnline = true;
    });

    this.socket.on("userisOffline", (data: any) => {
      this.isOnline = false;
    })
    this.socket.on("typingStart", () => {
      this.isTyping = true;
      this.scrollTobottom();
    })
    this.socket.on("typingEnd", () => {
      this.isTyping = false;
      this.scrollTobottom();
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
      "sender": this.currentUserId,
      "message_type": "text",
      "message_text": this.message,
      "attachment_type": "text",
      "attachment_url": null,
      "is_deleted": false,
      "createdby": this.currentUserId,
      "updatedby": this.currentUserId
    })
    this.message = "";
    this.scrollTobottom();
  }

  scrollTobottom() {
    setTimeout(() => {
      let height = this.content.nativeElement.scrollHeight;
      this.content.nativeElement.scrollTo(0, height);
    }, 200);
  }

  onTyping() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    let groupName = this.selectedUser.groups.group_name;
    this.socket.emit("typingStart", groupName);
    this.timeout = setTimeout(() => {
      this.socket.emit("typingEnd", groupName);
    }, 1000);
  }
}
