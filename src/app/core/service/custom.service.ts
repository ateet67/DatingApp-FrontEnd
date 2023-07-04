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
    return this.api.get("get/professions/");
  }

  getZodiacs(): Observable<Zodiac[]> {
    return this.api.get("get/zoidacs/");
  }

  getGoingOuts(): Observable<GoingOut[]> {
    return this.api.get("get/goingouts/");
  }

  getFoodAndDrinks(): Observable<FoodAndDrinks[]> {
    return this.api.get("get/foodanddrinks/");
  }

  getEthinicities(): Observable<Ethnicity[]> {
    return this.api.get("get/ethnicities/");
  }

  getHobbies(): Observable<Hobby[]> {
    return this.api.get("get/hobbies/");
  }
}
