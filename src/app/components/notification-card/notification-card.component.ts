import { User } from 'src/app/shared/interfaces/user.type';
import { Constants } from './../../config/constants';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {
  @Input() type!: string;
  @Input() swipeInfo!: any;
  description!: string;
  user!: User 
  serverUrl: string = Constants.SOCKET_ENDPOINT
  
  ngOnInit(): void {
    console.log(this.swipeInfo);
    this.user = this.swipeInfo.intrested_user;
    switch (this.type) {
      case 'swipe':
        this.description = `Swiped Right to Your Profile`
        break;
      default:
        break;
    }
  }
}
