import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private api: ApiHttpService) { }


  addNewPrefrences(url: string, data: any): Observable<any> {
    return this.api.post(url, data);
  }

  getItem(url: string): Observable<any> {
    return this.api.get(url);
  }

  deleteItem(url: string): Observable<any> {
    return this.api.delete(url);
  }

  getUserList(): Observable<any> {
    return this.api.get("admin/getAlluser");
  }
}
