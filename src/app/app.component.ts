import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Daisy';

  constructor(private permissionsService: NgxPermissionsService) { }

  ngOnInit(): void {
    const perm = ["EDITOR"];

    this.permissionsService.loadPermissions(perm);
  }
}
