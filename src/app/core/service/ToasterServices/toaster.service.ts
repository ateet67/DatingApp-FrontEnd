import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToasterPosition } from '../../enums/ToasterPoitions';

@Injectable({
  providedIn: 'root'
})


export class ToasterService {

  constructor(private toastr: ToastrService) { }
  toastOptioins: ToastOptioins = {
    closeButton: true,
    easing: 'ease-in',
    easeTime: 200,
    newestOnTop: true,
    tapToDismiss: true,
    timeOut: 2000,
    positionClass: ToasterPosition.topRight
  }
  Sucess(title: string, message: string, positions?: ToasterPosition, duration?: number) {
    this.toastOptioins.timeOut = duration ?? 2000;
    this.toastOptioins.positionClass = positions ?? ToasterPosition.topRight
    this.toastr.success(message, title, this.toastOptioins);
  }

  Error(title: string, message: string, positions?: ToasterPosition, duration?: number) {
    this.toastOptioins.timeOut = duration ?? 2000;
    this.toastOptioins.positionClass = positions ?? ToasterPosition.topCenter;
    this.toastr.error(message, title, this.toastOptioins);
  }

}
interface ToastOptioins {
  closeButton: boolean,
  easing: string,
  easeTime: number,
  newestOnTop: boolean,
  tapToDismiss: boolean,
  timeOut: number,
  positionClass: ToasterPosition
}