import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToasterService } from 'src/app/core/service/ToasterServices/toaster.service';
import { UserService } from 'src/app/core/service/UserService/user.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { CustomService } from 'src/app/core/service/custom.service';
import { setUser } from 'src/app/core/store/actions/user.actions';
import { Ethnicity } from 'src/app/shared/interfaces/ethnicity.type';
import { FoodAndDrinks } from 'src/app/shared/interfaces/food-and-drinks.type';
import { GoingOut } from 'src/app/shared/interfaces/going-out.type';
import { Hobby } from 'src/app/shared/interfaces/hobby.type';
import { Profession } from 'src/app/shared/interfaces/profession.type';
import { UserSocialProfile } from 'src/app/shared/interfaces/user-social-profile.type';
import { User } from 'src/app/shared/interfaces/user.type';
import { Zodiac } from 'src/app/shared/interfaces/zodiac.type';
import { ProfileInfo } from 'src/app/shared/models/profileinfo.model';
import { User as UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileInfo!: ProfileInfo;
  isLoading = true;
  currentUser = this.auth.getuser()


  ethinicities: Ethnicity[] = [];
  selectedEthinicities: Ethnicity[] = [];
  zodiacs: Zodiac[] = [];
  professions: Profession[] = [];
  foodAndDrinks: FoodAndDrinks[] = [];
  SelectedfoodAndDrinks: FoodAndDrinks[] = [];
  goingOuts: GoingOut[] = [];
  SelectedgoingOuts: GoingOut[] = [];
  hobbies: Hobby[] = [];
  socialProfiles: Array<UserSocialProfile> = []

  constructor(
    private userservice: UserService,
    private customservice: CustomService,
    private toast: ToasterService,
    private router: Router,
    private store: Store<any>,
    private auth: AuthService,
  ) { }
  ngOnInit(): void {

    this.customservice.getProfessions().subscribe((res: Profession[]) => {
      // console.log(res);
      this.professions = res
    });

    this.customservice.getZodiacs().subscribe((res: Zodiac[]) => {
      this.zodiacs = res;
    });

    this.customservice.getEthinicities().subscribe((res: Ethnicity[]) => {
      this.ethinicities = res;
    });

    this.customservice.getFoodAndDrinks().subscribe((res: FoodAndDrinks[]) => {
      this.foodAndDrinks = res;
    });

    this.customservice.getHobbies().subscribe((res: Hobby[]) => {
      this.hobbies = res;
    });

    this.customservice.getGoingOuts().subscribe((res: GoingOut[]) => {
      this.goingOuts = res;
    });

    this.userservice.GetProfileInfo().subscribe((profiledata) => {
      this.profileInfo = new ProfileInfo(profiledata.data)
      console.log("Profile info", this.profileInfo);

      this.isLoading = false
    })

  }

  PersonalInfoFormSubmit(form: NgForm) {
    form.form.markAllAsTouched()
    if (form.form.valid) {
      this.isLoading = true;
      this.profileInfo.dob = moment(this.profileInfo.dob).format('YYYY-MM-DD');
      this.userservice.UpdatePersonalInfo(this.profileInfo).subscribe((data: any) => {
        this.isLoading = false
        if (data.status) {
          this.toast.Sucess("Successfull", "Your Profile has been updated Sucesfully");
          this.store.dispatch(setUser({ user: new UserModel(data.data) }));
        } else {
          this.toast.Error("Error", "There is some error updating your profile information! Plz try again after some time!")
        }

      });
    }
  }
  UpdatePrefrences(form: NgForm) {

    this.profileInfo.ethicity = this.addCustomFieldToArrayOfObject(this.profileInfo.ethicity, "ethnicity_id", "id")
    this.profileInfo.professions = this.addCustomFieldToArrayOfObject(this.profileInfo.professions, "profession_id", "id")
    this.profileInfo.hobby = this.addCustomFieldToArrayOfObject(this.profileInfo.hobby, "hobby_id", "id")
    this.profileInfo.goingout_preference = this.addCustomFieldToArrayOfObject(this.profileInfo.goingout_preference, "goingout_id", "id")
    this.profileInfo.food_prefrences = this.addCustomFieldToArrayOfObject(this.profileInfo.food_prefrences, "food_drink_id", "id")

    console.log("user_ethnicity", this.profileInfo.ethicity)
    console.log("user_profession", this.profileInfo.professions)
    console.log("user_hobby", this.profileInfo.hobby)
    console.log("user_goingout_preference", this.profileInfo.goingout_preference)
    console.log("user_food_preference", this.profileInfo.food_prefrences)


    this.userservice.UpdateEthnicity(this.profileInfo.ethicity).subscribe(this.ShowSucess, this.ShowError)
    this.userservice.UpdateProfession(this.profileInfo.professions).subscribe(this.ShowSucess, this.ShowError)
    this.userservice.UpdateHobby(this.profileInfo.hobby).subscribe(this.ShowSucess, this.ShowError)
    this.userservice.UpdateGoingout(this.profileInfo.goingout_preference).subscribe(this.ShowSucess, this.ShowError)
    this.userservice.UpdateSocialProfile(this.profileInfo.social_profiles).subscribe(this.ShowSucess, this.ShowError)
    this.userservice.UpdateFoodanddrink(this.profileInfo.food_prefrences).subscribe(this.ShowSucess, this.ShowError)
  }

  Allowonly18Plus(): string {

    return moment().subtract(18, 'years').format('YYYY-MM-DD');
  }
  setSocialProfile(arr: Array<UserSocialProfile>) {
    this.socialProfiles = arr
  }
  ShowError({ error }: any) {
    console.log(error);

    this.isLoading = false
    // this.toast.Error("there is some error", "try again later")
  }
  ShowSucess(data: any) {
    console.log("sucess",data);
    
    this.isLoading = false

    // this.toast.Sucess("Sucessfull", "Updated")
  }
  addCustomFieldToArrayOfObject(arr: Array<any>, fieldName: string, arrayField: any) {
    return arr.length > 0 ? arr.map(ele => Object.assign(ele, { [fieldName]: ele[arrayField] })) : []
  }

}
