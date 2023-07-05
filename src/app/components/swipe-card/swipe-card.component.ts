import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import * as kf from './keyframes';
import { User } from './user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-swipe-card',
  templateUrl: './swipe-card.component.html',
  styleUrls: ['./swipe-card.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]
})
export class SwipeCardComponent {
  public users: User[] = [{
    "id": 0,
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
  public index = 0;
  @Input()
  parentSubject: Subject<any> = new Subject();



  animationState: string = '';
  constructor() { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      console.log(event);

      this.startAnimation(event)
    });
  }

  startAnimation(state: any) {
    console.log(state);

    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state: any) {
    this.animationState = '';
    this.index++;
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
