import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../config/constants";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {
  options = {}

  constructor(private httpClient: HttpClient) {
    this.options = {
      responseType: 'json',
      withCredentials: true
      // enctype: 'application/x-www-form-urlencoded'
    }
  }

  get(url: string): Observable<any> {
    return this.httpClient
      .get<any>(`${Constants.API_ENDPOINT}/${url}`, this.options)
  }

  delete(url: string): Observable<any> {
    return this.httpClient
      .delete<any>(`${Constants.API_ENDPOINT}/${url}`, this.options)
  }

  post(url: string, data: any): Observable<any> {
    return this.httpClient
      .post<any>(`${Constants.API_ENDPOINT}/${url}`, data, this.options)
  }

  patch(url: string, data: any): Observable<any> {
    return this.httpClient
      .patch<any>(`${Constants.API_ENDPOINT}/${url}`, data, this.options)
  }
}
