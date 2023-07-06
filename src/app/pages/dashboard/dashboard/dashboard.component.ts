import { Component, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SwipeCardComponent } from 'src/app/components/swipe-card/swipe-card.component';
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
    console.log(this.childrenRef);
  }

  user: User = new UserModel({});

  public users = [{
    "id": 15,
    "picture": "assets/images/u2.webp",
    "age": 23,
    "name": "Candace Coffey",
    "gender": "female"
  },
  {
    "id": 1,
    "picture": "assets/images/u3.webp",
    "age": 40,
    "name": "Katrina Potter",
    "gender": "female"
  },
  {
    "id": 2,
    "picture": "assets/images/u4.webp",
    "age": 35,
    "name": "Genevieve Hardy",
    "gender": "female"
  },
  {
    "id": 3,
    "picture": "assets/images/u2.webp",
    "age": 30,
    "name": "Cabrera Jefferson",
    "gender": "male"
  },
  {
    "id": 4,
    "picture": "assets/images/u3.webp",
    "age": 37,
    "name": "Guadalupe Keith",
    "gender": "female"
  }];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    console.info(this.childrenRef);
    // console.log(this.store.select((store: any) => store.user));
    this.store.select('user').subscribe((data) => {
      this.user = data;
    });
    // this.user = this.store.dispatch(getUser());
  }

  cardAnimation(value: any) {
    console.log(this.childrenRef);
    this.childrenRef.first.startAnimation(value, this.childrenRef.first.user.id);
  }

  CardSwiped(id: any) {
    this.users = this.users.filter((p) => p.id !== id)
    console.log(id);
  }
}
