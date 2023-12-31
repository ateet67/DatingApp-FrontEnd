import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { AppAutoCompleteComponent } from './app-auto-complete/app-auto-complete.component';
import { SwipeCardComponent } from './swipe-card/swipe-card.component';
import { NotificationComponent } from '../pages/notification/notification.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import { MessagingComponent } from './messaging/messaging.component'
import { ScrollToBottomDirective } from '../core/directives/scroll-to-bottom.directive';
import { FireSeenPipe } from '../core/pipes/fire-seen.pipe';
import { SocialLinksComponent } from './social-links/social-links.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddNewPreferenceComponent } from './add-new-preference/add-new-preference.component';
import { AlphabetsOnlyDirective } from '../core/directives/alphabets-only.directive';
import { AgGridModule } from 'ag-grid-angular';
import { ImageRendererComponent } from './CellRenderer/image-renderer/image-renderer.component';

     
@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    ButtonsComponent,
    SlideToggleComponent,
    SliderComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    FormsComponent,
    AlertsComponent,
    GridListComponent,
    TooltipsComponent,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    AppAutoCompleteComponent,
    SwipeCardComponent,
    ConfirmationDialogComponent,
    MessagingComponent,
    ScrollToBottomDirective,
    FireSeenPipe,
    SocialLinksComponent,
    NgxPermissionsModule,
    AddNewPreferenceComponent,
    AlphabetsOnlyDirective,
  ],
  declarations: [

    AppAutoCompleteComponent,
    SwipeCardComponent,
    NotificationComponent,
    ConfirmationDialogComponent,
    CloseButtonComponent,
    MessagingComponent,
    ScrollToBottomDirective,
    FireSeenPipe,
    SocialLinksComponent,
    AddNewPreferenceComponent,
    AlphabetsOnlyDirective,
    ImageRendererComponent
  ]
})
export class ComponentsModule {

}
