import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  api: ApiHttpService;

  constructor(http: HttpClient, public jwtHelper: JwtHelperService) {
    this.api = new ApiHttpService(http);
  }

  uploadImage(data: FormData): Observable<boolean> {
    return this.api.post("profile/images", data);
  }
}
