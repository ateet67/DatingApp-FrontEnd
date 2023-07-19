import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from 'src/app/core/service/api-http.service';
import { CustomService } from 'src/app/core/service/custom.service';
import { Profession } from 'src/app/shared/interfaces/profession.type';

@Component({
  selector: 'app-prefrences',
  templateUrl: './prefrences.component.html',
  styleUrls: ['./prefrences.component.scss']
})
export class PrefrencesComponent implements OnInit {

 

  items = [
    {
      name: 'profession',
      label: 'Profession'
    },
    {
      name: 'ethnicity',
      label: 'Ethinicity'
    },
    {
      name: 'foodanddrink',
      label: 'Food & Drinks'
    },
    {
      name: 'goingout',
      label: 'Going out'
    },
    {
      name: 'hobby',
      label: 'Hobby'
    }
  ];
  constructor(private common: CustomService, private api: ApiHttpService) { }

  ngOnInit(): void {
    // this.common.getProfessions().subscribe((data: Profession[]) => {
    //   this.professions = data;
    // })
  }


  remove(prf: Profession) {

  }

}
