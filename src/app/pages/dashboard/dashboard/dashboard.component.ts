import { Component, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { SwipeCardComponent } from 'src/app/components/swipe-card/swipe-card.component';
import { SocketService } from 'src/app/core/service/SocketServices/socket.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
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

  ngAfterViewInit(): void {
    // console.log(this.childrenRef);
  }


  // public users = [{
  //   "id": 15,
  //   "picture": "assets/images/u2.webp",
  //   "age": 23,
  //   "name": "Candace Coffey",
  //   "gender": "female"
  // },
  // {
  //   "id": 1,
  //   "picture": "assets/images/u3.webp",
  //   "age": 40,
  //   "name": "Katrina Potter",
  //   "gender": "female"
  // },
  // {
  //   "id": 2,
  //   "picture": "assets/images/u4.webp",
  //   "age": 35,
  //   "name": "Genevieve Hardy",
  //   "gender": "female"
  // },
  // {
  //   "id": 3,
  //   "picture": "assets/images/u2.webp",
  //   "age": 30,
  //   "name": "Cabrera Jefferson",
  //   "gender": "male"
  // },
  // {
  //   "id": 4,
  //   "picture": "assets/images/u3.webp",
  //   "age": 37,
  //   "name": "Guadalupe Keith",
  //   "gender": "female"
  // }];
  users!: Array<User>;
  currentUser: User = this.authService.getuser();
  isLoading: boolean = false;
  constructor(
    private store: Store<any>,
    private socketservice: SocketService,
    private userservice: UserService,
    private authService: AuthService,
    private socket: Socket,
    private snackbar: SnackbarService
  ) { }

  ngOnInit() {
    console.info(this.currentUser);
    // console.log(this.store.select((store: any) => store.user));
    // this.store.select('user').subscribe((data) => {
    //   this.currentUser = data;
    // });
    this.userservice.GetUsers().subscribe((data) => this.users = data)
    // this.user = this.store.dispatch(getUser());
  }

  cardAnimation(value: any) {

    this.childrenRef.first.startAnimation(value, this.childrenRef.first.user.id);
    console.log(this.childrenRef.first.user.id);

    this.socketservice.ProfileSwipe(this.childrenRef.first.user.id ?? 0, value === "swiperight")
  }

  CardSwiped(data: any) {
    const { id, state } = data
    // this.socketservice.ProfileSwipe( this.childrenRef.first.user.id,value==="swiperight")
    this.users = this.users.filter((p) => p.id !== id)
    state === "swiperight" && this.socket.emit('sendInvitation', {
      "isActive": true,
      "isAccepted": false,
      "invited_by": this.currentUser.id,
      "invited_to": id,
      "updated_by": this.currentUser.id
    });
  }
  likeProfile() {

    this.socket.emit("profileLike", {
      likedby: this.currentUser.id,
      user_id: this.childrenRef.first.user.id,
      type: "Normalike",
      dislike: false,
      createdby: this.currentUser.id,
      updatedby: this.currentUser.id
    })
    this.snackbar.ShowSnackBar("Liked")

  }
}
