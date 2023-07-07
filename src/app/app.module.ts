import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule, } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { StoreModule } from '@ngrx/store';
import * as Hammer from "hammerjs";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";
import { PasswordPatternDirective } from './core/directives/password-pattern.directive';
import { MatchPasswordDirective } from './core/directives/match-password.directive';
import { ValidateUserNameDirective } from './core/directives/validate-user-name.directive';
import { AlphabetsOnlyDirective } from './core/directives/alphabets-only.directive';
import { AlphNumericDirective } from './core/directives/alph-numeric.directive';
import { CountryCodeDirective } from './core/directives/country-code.directive';
import { NumbersOnlyDirective } from './core/directives/numbers-only.directive';
import { JwtModule } from '@auth0/angular-jwt';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { userReducer } from './core/store/reducers/user.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ChatsComponent } from './pages/dashboard/chats/chats.component';
import { MyHammerConfig } from './hammer';
import { ImagesComponent } from './pages/profile/images/images.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    AlphabetsOnlyDirective,
    AlphNumericDirective,
    CountryCodeDirective,
    NumbersOnlyDirective,
    DashboardComponent,
    ChatsComponent,
    ImagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
    StoreModule.forRoot({ user: userReducer }, {}),
    NgbModule,
    HammerModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
