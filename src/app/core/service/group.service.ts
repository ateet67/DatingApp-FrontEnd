import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private api: ApiHttpService) { }

  getGroups(): Observable<any> {
    return this.api.get("groups");
  }


}
