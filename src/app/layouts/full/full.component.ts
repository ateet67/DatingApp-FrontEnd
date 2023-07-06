import { getUser } from './../../core/store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  search: boolean = false;
  user$: any = '';
  today: Date = new Date();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<any>) {
  }
  ngOnInit(): void {
    console.log(this.isHandset$);

    console.log(this.store.select((store: any) => store.user));
    this.store.select('user').subscribe((data) => {
      this.user$ = data;
    });




  }
  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboard/home",
      icon: "home",
      menu: "Home",
    },
    {
      link: "/dashboard/chats",
      icon: "message-circle",
      menu: "Chats",
    }
  ]

}
