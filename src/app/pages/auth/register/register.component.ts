import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { CustomService } from 'src/app/core/service/custom.service';
import { Ethnicity } from 'src/app/shared/interfaces/ethnicity.type';
import { FoodAndDrinks } from 'src/app/shared/interfaces/food-and-drinks.type';
import { GoingOut } from 'src/app/shared/interfaces/going-out.type';
import { Hobby } from 'src/app/shared/interfaces/hobby.type';
import { Profession } from 'src/app/shared/interfaces/profession.type';
import { User } from 'src/app/shared/interfaces/user.type';
import { Zodiac } from 'src/app/shared/interfaces/zodiac.type';
import { User as Usermodel } from 'src/app/shared/models/user.model';
import * as moment from 'moment';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  ethinicities: Ethnicity[] = [];
  selectedEthinicities: Ethnicity[] = [];
  zodiacs: Zodiac[] = [];
  professions: Profession[] = [];
  foodAndDrinks: FoodAndDrinks[] = [];
  SelectedfoodAndDrinks: FoodAndDrinks[] = [];
  goingOuts: GoingOut[] = [];
  SelectedgoingOuts: GoingOut[] = [];
  hobbies: Hobby[] = [];
  userData: User = new Usermodel({});
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hide: boolean | string = true;
  isLoading: boolean = false;
  otpVeriffication: boolean = false;
  values: number[] = [1, 2, 3]

  otpData = {
    otp: "",
    otptoken: ""
  };

  constructor(private service: CustomService, private authServivce: AuthService, private router: Router) { }

  ngOnInit() {
    this.service.getProfessions().subscribe((res: Profession[]) => {
      // console.log(res);
    });

    this.service.getZodiacs().subscribe((res: Zodiac[]) => {
      this.zodiacs = res;
    });

    this.service.getEthinicities().subscribe((res: Ethnicity[]) => {
      this.ethinicities = res;
    });

    this.service.getFoodAndDrinks().subscribe((res: FoodAndDrinks[]) => {
      this.foodAndDrinks = res;
    });

    this.service.getHobbies().subscribe((res: Hobby[]) => {
      this.hobbies = res;
    });

    this.service.getGoingOuts().subscribe((res: GoingOut[]) => {
      this.goingOuts = res;
    });
  }

  GetUserData(form: NgForm) {
    form.form.markAllAsTouched();
    if (form.form.valid) {
      this.isLoading = true;
      this.userData.dob = moment(this.userData.dob).format('YYYY-MM-DD');
      this.authServivce.registerUser(this.userData).subscribe((data: any) => {
        console.log(data);
        setTimeout(() => {
          this.isLoading = false;
          if (data.otpToken) {
            this.otpData.otptoken = data.otpToken;
            this.otpVeriffication = true;
          }
        }, 1000);
      });
    }
  }


  Allowonly18Plus(): string {
    return moment().subtract(18, 'years').format('YYYY-MM-DD');
  }

  VerifyOtp() {
    console.log(this.otpData);

    this.authServivce.verifyOTP(this.otpData).subscribe((data) => {
      if (data['verified']) {
        this.router.navigate(['/auth/login'])
      }
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option);
    this.selectedEthinicities = [...this.selectedEthinicities, event.option.value].filter((e, i, a) => a.indexOf(e) == i);
  }

  remove(item: Ethnicity): void {
    const index = this.selectedEthinicities.indexOf(item);
    if (index >= 0) {
      this.selectedEthinicities.splice(index, 1);
    }
  }


}
