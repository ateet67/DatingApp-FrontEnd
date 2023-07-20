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
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ValidateUserNameDirective } from './core/directives/validate-user-name.directive';
import { AlphNumericDirective } from './core/directives/alph-numeric.directive';
import { CountryCodeDirective } from './core/directives/country-code.directive';
import { NumbersOnlyDirective } from './core/directives/numbers-only.directive';
import { JwtModule } from '@auth0/angular-jwt';
import { userReducer } from './core/store/reducers/user.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { ChatsComponent } from './pages/dashboard/chats/chats.component';
import { MyHammerConfig } from './hammer';
import { ImagesComponent } from './pages/profile/images/images.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileInfoComponent } from './pages/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HttpinterceptorInterceptor } from './core/interceptors/httpinterceptor.interceptor';
import { Constants } from './config/constants';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PrefrencesComponent } from './pages/admin/prefrences/prefrences.component';
import { AgGridModule } from 'ag-grid-angular';
import { UserlistComponent } from './pages/admin/userlist/userlist.component';
import { PasswordPatternDirective } from './core/directives/password-pattern.directive';
import { MatchPasswordDirective } from './core/directives/match-password.directive';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';

const socketConfig: SocketIoConfig = {
  url: Constants.SOCKET_ENDPOINT, // socket server url;
  options: {
    transports: ['websocket']
  }
}

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
    ValidateUserNameDirective,
    AlphNumericDirective,
    CountryCodeDirective,
    NumbersOnlyDirective,
    DashboardComponent,
    ChatsComponent,
    ImagesComponent,
    ForgetPasswordComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    PrefrencesComponent,
    UserlistComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    VerifyOtpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    AgGridModule,
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
    HammerModule,
    SocketIoModule.forRoot(socketConfig),
    ToastrModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
