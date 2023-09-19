import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent as Profiles } from './pages/dashboard/dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ChatsComponent } from './pages/dashboard/chats/chats.component';
import { AuthGuard, ImageGuard } from './core/service/auth-guard.service';
import { ImagesComponent } from './pages/profile/images/images.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileInfoComponent } from './pages/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { PrefrencesComponent } from './pages/admin/prefrences/prefrences.component';
import { UserlistComponent } from './pages/admin/userlist/userlist.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard, ImageGuard],
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/dashboard/home", pathMatch: "full" },
      { path: "home", component: Profiles },
      { path: "chats", component: ChatsComponent },
      { path: "notification", component: NotificationComponent },
      { path: "account", component: ProfileInfoComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "changepassword", component: VerifyOtpComponent },
      //below unwanted
      { path: "home2", component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
    ]
  },
  {
    path: "profile", component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/profile/images", pathMatch: "full" },
      { path: "images", component: ImagesComponent },

    ]
  },
  {
    path: "auth", component: AuthComponent,
    children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "passwordreset", component: ForgetPasswordComponent }
    ]
  },
  {
    path: "admin", component: FullComponent,
    children: [
      { path: "", redirectTo: "/admin/prefrences", pathMatch: "full" },
      { path: "prefrences", component: PrefrencesComponent },
      { path: "userList", component: UserlistComponent },
    ]
  },

  
  // { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
