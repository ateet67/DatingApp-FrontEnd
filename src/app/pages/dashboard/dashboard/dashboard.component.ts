import { Component, QueryList, ViewChildren, AfterViewInit, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { SwipeCardComponent } from 'src/app/components/swipe-card/swipe-card.component';
import { ToasterPosition } from 'src/app/core/enums/ToasterPoitions';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { ToasterService } from 'src/app/core/service/ToasterServices/toaster.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { getUser } from 'src/app/core/store/actions/user.actions';
import { User } from 'src/app/shared/interfaces/user.type';
import { User as UserModel } from 'src/app/shared/models/user.model';

interface cards {
  image: string;
  btn: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChildren(SwipeCardComponent)
  childrenRef!: QueryList<SwipeCardComponent>;

  parentSubject: Subject<string> = new Subject();
  ToggleLikeFlag = false
  users: Array<User> = [];
  currentUser: User = this.authService.getuser();
  isLoading: boolean = false;
  constructor(
    private store: Store<any>,
    private socketservice: SocketService,
    private userservice: UserService,
    private authService: AuthService,
    private socket: Socket,
    private toast:ToasterService
  ) { }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.currentUser = this.authService.getuser();
    this.userservice.GetUsers().subscribe((data: any) => {
      this.users = data;
      this.isLoading = false
      this.SetLikeDislike(this.users[0])
    })

  }

  cardAnimation(value: any) {

    this.childrenRef.first.startAnimation(value, this.childrenRef.first.user.id);
    console.log(this.childrenRef.first.user.id);

    this.socketservice.ProfileSwipe(this.childrenRef.first.user.id ?? 0, value === "swiperight")

  }

  CardSwiped(data: any) {
    const { id, state } = data
    this.socketservice.ProfileSwipe(id, state === "swiperight")
    this.users = this.users.filter((p) => p.id !== id)
    state === "swiperight" && this.socket.emit('sendInvitation', {
      "isActive": true,
      "isAccepted": false,
      "invited_by": this.currentUser.id,
      "invited_to": id,
      "updated_by": this.currentUser.id
    });
    const currentIndex = Array.from(this.users).findIndex((user: any) => user.id === id);
    this.SetLikeDislike(this.users[currentIndex + 1])
  }
  TogglelikeProfile() {
    console.log("swiped afyer");

    this.ToggleLikeFlag = !this.ToggleLikeFlag

    if (this.ToggleLikeFlag) {
      let isLiked = this.childrenRef.first.user.profile_like.find((like) => {
        return like.likedby === this.currentUser.id
      })
      if (!isLiked) {
        this.childrenRef.first.user.profile_like.push({
          likedby: this.currentUser.id,
          user_id: this.childrenRef.first.user.id,
          type: "Normalike",
          dislike: this.ToggleLikeFlag,
          createdby: this.currentUser.id,
          updatedby: this.currentUser.id
        });
      }
    }
    else {
      this.childrenRef.first.user.profile_like.pop()
    }
    this.socket.emit("profileLike", {
      likedby: this.currentUser.id,
      user_id: this.childrenRef.first.user.id,
      type: "Normalike",
      dislike: this.ToggleLikeFlag,
      createdby: this.currentUser.id,
      updatedby: this.currentUser.id
    })

    // this.snackbar.ShowSnackBar(this.ToggleLikeFlag?"Liked":"")

  }
  SetLikeDislike(user: User) {
    if (user && user.profile_like.some((like: any) => like.likedby === this.currentUser.id)) {
      this.ToggleLikeFlag = true
    }
    else {
      this.ToggleLikeFlag = false
    }
  }
}
