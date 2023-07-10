import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CloseButtonComponent } from 'src/app/components/close-button/close-button.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor( private snackBar: MatSnackBar) { }
  
  ShowSnackBar(message: string,duration: number=2000){
    this.snackBar.openFromComponent(CloseButtonComponent, {
      data: message,
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }
}
