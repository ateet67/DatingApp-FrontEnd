import { User as UserModel } from 'src/app/shared/models/user.model';
import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as kf from './keyframes';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.type';
import * as moment from 'moment';
import config from 'src/app/environments/environment.local';

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
  @Input() user: User = new UserModel({});

  @Input()
  parentSubject!: Subject<any>;


  @Output() onSwipeCard = new EventEmitter<number>();

  serverUrl: string = config.socketUrl


  animationState: string = '';
  constructor() { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      console.log(event);

      this.startAnimation(event)
    });
  }

  startAnimation(state: any, id?: number) {
    if (!this.animationState) {
      this.animationState = state;
    }
    setTimeout(() => {
      id && this.onSwipeCard.emit({ id, state } as any);
    }, 750);
  }

  resetAnimationState(id: number) {
    this.animationState = '';
  }

  public get age(): number {
    return moment().diff(this.user.dob, 'years', false);
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
