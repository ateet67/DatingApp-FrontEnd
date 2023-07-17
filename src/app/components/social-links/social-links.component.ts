import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserSocialProfile } from 'src/app/shared/interfaces/user-social-profile.type';
import { User } from 'src/app/shared/interfaces/user.type';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent implements OnInit {
  @Input() userSocialProfile: Array<UserSocialProfile> = []
  @Input() isEdit = false;
  @Output() SocialProfileValue = new EventEmitter();
  currentUser!: User


  constructor(private authservice: AuthService) { }
  ngOnInit(): void {
    this.currentUser = this.authservice.getuser()
  }
  addSocialProfile() {
    this.userSocialProfile.push({
      link: '',
      platform_name: '',
      user_id: this.currentUser.id
    })
    this.emitValue()
  }
  removeField(i: number) {
    this.userSocialProfile.splice(i, 1)
    this.emitValue()
  }
  emitValue() {
    this.SocialProfileValue.emit(this.userSocialProfile)
  }

}
