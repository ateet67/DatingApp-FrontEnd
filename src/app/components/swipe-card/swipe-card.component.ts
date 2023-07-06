import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() user: User = {
    "id": 0,
    "picture": "",
    "age": 23,
    "name": "",
    "gender": ""
  };

  @Input()
  parentSubject!: Subject<any>;


  @Output() onSwipeCard = new EventEmitter<number>();



  animationState: string = '';
  constructor() { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      console.log(event);

      this.startAnimation(event)
    });
  }

  startAnimation(state: any, id?: number) {
    console.log(state);
    if (!this.animationState) {
      this.animationState = state;
    }
    setTimeout(() => {
      id && this.onSwipeCard.emit(id);
    }, 750);
  }

  resetAnimationState(id: number) {
    this.animationState = '';
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
