import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent {
  constructor(private snackbar:MatSnackBar,@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  public dismissSnackbar(): void {
    this.snackbar.dismiss();
  }
}
