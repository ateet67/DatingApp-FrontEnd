import { Component } from '@angular/core';
import { Subject } from 'rxjs';

interface cards {
  image: string;
  btn: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  parentSubject: Subject<string> = new Subject();

  constructor() {

  }

  cardAnimation(value: any) {
    this.parentSubject.next(value);
  }

  cards: cards[] = [
    {
      image: "assets/images/u2.webp",
      btn: "warn",
    },
    {
      image: "assets/images/u3.webp",
      btn: "primary",
    },
    {
      image: "assets/images/u4.webp",
      btn: "accent",
    },
  ]
}
