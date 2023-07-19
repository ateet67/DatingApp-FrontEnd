import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/service/admin.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUserList().subscribe(
      data => {
        console.log(data.data);

      }
    )
  }
}
