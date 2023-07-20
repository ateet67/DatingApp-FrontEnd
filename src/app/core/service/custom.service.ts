import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profession } from 'src/app/shared/interfaces/profession.type';
import { Zodiac } from 'src/app/shared/interfaces/zodiac.type';
import { FoodAndDrinks } from 'src/app/shared/interfaces/food-and-drinks.type';
import { Hobby } from 'src/app/shared/interfaces/hobby.type';
import { Ethnicity } from 'src/app/shared/interfaces/ethnicity.type';
import { GoingOut } from 'src/app/shared/interfaces/going-out.type';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  api: ApiHttpService;

  constructor(http: HttpClient) {
    this.api = new ApiHttpService(http);
  }

  getProfessions(): Observable<Profession[]> {
    return this.api.get("get/profession/");
  }

  getZodiacs(): Observable<Zodiac[]> {
    return this.api.get("get/zodiac/");
  }

  getGoingOuts(): Observable<GoingOut[]> {
    return this.api.get("get/goingout/");
  }

  getFoodAndDrinks(): Observable<FoodAndDrinks[]> {
    return this.api.get("get/foodanddrink/");
  }

  getEthinicities(): Observable<Ethnicity[]> {
    return this.api.get("get/ethnicity/");
  }

  getHobbies(): Observable<Hobby[]> {
    return this.api.get("get/hobby/");
  }
}
