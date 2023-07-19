import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import { Constants } from 'src/app/config/constants';
import { ApiHttpService } from 'src/app/core/service/api-http.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush // this line
})
export class MessagingComponent implements OnInit, OnDestroy {

  @Input()
  selectedUser!: any;
  baseURL = Constants.SOCKET_ENDPOINT;
  currentUserId = this.authService.getuser().id;
  message!: string;
  allMessages: any = [];
  isLoading: boolean = true;
  isOnline: boolean = false;
  isTyping: boolean = false;
  isMsgSeen: boolean = false;
  @ViewChild('content') content!: ElementRef;
  timeout: any;
  per_page: number = 20;
  page: number = 1;
  totalPages: number = 1
  getDateFormat = (val: any) => moment(val).format('hh:mm A');
  getLastSeen = (val: any) => moment(val).fromNow();
  getDayStamp = (val: any) => moment(val).format("DD-MM-YYYY");

  constructor(
    private authService: AuthService,
    private socket: Socket,
    private api: ApiHttpService,
    private cdr: ChangeDetectorRef) { }

  ngAfterContentChecked() { }

  ngOnInit(): void {
    this.isOnline = this.selectedUser.groups.is_online || false;
    this.socket.on("recevieMessage", (data: any) => {
      if (this.selectedUser.groups.group_id == data.data.group_id) {
        this.allMessages.push(data.data);
        this.scrollTobottom();
      }
    });
    this.socket.on("userisOnline", (data: any) => {
      this.isOnline = true;
    });

    this.socket.on("userisOffline", (data: any) => {
      this.isOnline = false;
    })
    this.socket.on("typingStart", (groupName: string) => {
      if (this.selectedUser.groups.group_name == groupName) {
        this.isTyping = true;
        this.scrollTobottom();
      }
    })
    this.socket.on("typingEnd", (groupName: string) => {
      if (this.selectedUser.groups.group_name == groupName) {
        this.isTyping = false;
        this.scrollTobottom();
      }
    })
    this.socket.on("msgSeen", (data: any) => {
      if (this.selectedUser.groups.group_id == data.group_id) {
        this.isMsgSeen = true;
        this.allMessages[this.allMessages.length - 1] = data;
      }
    })
    this.getMessages();
  }
  ngOnDestroy(): void {
    // this.socket.removeAllListeners("msgSeen");
  }

  getMessages(per_page?: number, page?: number) {
    if ((page ?? 1) <= this.totalPages) {

      this.api.post("conversation", { group_id: this.selectedUser.groups.group_id, page: page ?? 1, per_page: per_page ?? 20 }).subscribe((data: any) => {
        this.totalPages = data.totalPages
        this.allMessages = [...data.data.reverse(), ...this.allMessages];
        // this.allMessages = this.allMessages.map((obj : any) => ({ ...obj, date: new Date(obj.createdAt).toLocaleDateString() }))
        this.isLoading = false;
      })
    }

  }

  sendMessage(form: NgForm) {
    if (this.message == "" || this.message == null) return false;
    else {
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
      this.isMsgSeen = false;
      this.message = "";
      this.scrollTobottom();
      return true;
    }
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

  LoadMoreChat(e: number) {
    this.page++;
    this.getMessages(20, this.page);
  }

  seenMessage = (msg: any) => {
    // if (this.currentUserId != msg.sender && !msg.is_seen) {
    //   this.socket.emit("msgSeen", { msg: msg, groupName: this.selectedUser.groups.group_name });
    // }
  }

  dayStamp(date: Date, prevDate: Date): string | void {
    if (prevDate) {
      let d1 = this.getDayStamp(date);
      let d2 = this.getDayStamp(prevDate);

      // let diff = d1.diff(d2, 'days');
      // if (diff) { return diff + ' ago'; }
      if (new Date().toDateString() === new Date(date).toDateString()) {
        return "Today";
      }
      // else {
      if (d1 != d2) {
        return d1;
      }
      // }
    }
  }
}
