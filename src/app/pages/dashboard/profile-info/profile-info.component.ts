import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/config/constants';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { User } from 'src/app/shared/interfaces/user.type';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  profileInfo: any;
  isLoading = true;
  baseUrl = Constants.SOCKET_ENDPOINT;
  constructor(
    private userservice: UserService,
    private auth: AuthService,
  ) { }
  ngOnInit(): void {
    this.userservice.GetProfileInfo().subscribe((userinfo) => {
      this.profileInfo = userinfo.profile;
      this.isLoading = false
    })
  }
  
  public get age(): number {
    return moment().diff(this.profileInfo.dob, 'years', false);
  }


}