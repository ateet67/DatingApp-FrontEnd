import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Constants } from 'src/app/config/constants';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { User } from 'src/app/shared/interfaces/user.type';
import { ProfileInfo } from 'src/app/shared/models/profileinfo.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  profileInfo!: ProfileInfo;
  isLoading = true;
  baseUrl = Constants.SOCKET_ENDPOINT;
  likedList: any = []
  swipedList: any = []
  social_links: any = []
  constructor(
    private userservice: UserService,
    private auth: AuthService,
  ) { }
  ngOnInit(): void {
    this.userservice.GetProfileInfo().subscribe((userinfo) => {
      this.profileInfo = new ProfileInfo(userinfo.data);
      this.social_links = this.profileInfo.social_profiles.map((ele) => {
        return {
          ...ele,
          icon: this.GetSocialMediaIcon(ele.link)
        }
      })
    })
    this.userservice.GetLikeList().subscribe((likelist) => {
      this.likedList = likelist.likes
    })
    this.userservice.GetSwipeList().subscribe((swipes) => {
      this.swipedList = swipes.swipeList
      this.isLoading = false
    })
  }

  public get age(): number {
    return moment().diff(this.profileInfo.dob, 'years', false);
  }
  countage(date: any) {
    return moment().diff(date, 'years', false);
  }

  GetSocialMediaIcon(url: string): any {
    if (url.includes("reddit")) {
      return "assets/social_media_icons/reddit.svg"
    }
    if (url.includes("instagram")) {
      return "assets/social_media_icons/Instagram.svg"
    }
    if (url.includes("facebook")) {
      return "assets/social_media_icons/facebook.svg"
    }
    if (url.includes("t.me") || url.includes("telegram")) {
      return "assets/social_media_icons/telegram.svg"
    }
    if (url.includes("twitter")) {
      return "assets/social_media_icons/twitter.svg"
    }
    if (url.includes("linkedin")) {
      return "assets/social_media_icons/linkedin.svg"
    }
    if (url.includes("wa.me")) {
      return "assets/social_media_icons/whatsapp.svg"
    }
  }

}
