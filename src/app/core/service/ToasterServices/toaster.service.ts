import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }
  toastOptioins = {
    closeButton: true,
    easing: 'ease-in',
    easeTime: 200,
    newestOnTop: true,
    tapToDismiss: true,
    timeOut: 2500,
    positionClass: 'toast-top-center'

  }
  Sucess(title: string, message: string, duration: number = 2000) {
    this.toastOptioins.timeOut = duration;
    this.toastr.success(message, title, this.toastOptioins);
  }

  Error(title: string, message: string, duration: number = 2000) {
    this.toastOptioins.timeOut = duration;
    this.toastOptioins.positionClass = 'toast-top-center';
    this.toastr.error(message, title, this.toastOptioins);
  }

}
