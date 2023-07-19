import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from "../../../core/service/image-upload.service";
import { UserImages } from 'src/app/shared/interfaces/user-images.type';
import { Constants } from 'src/app/config/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { setProfileImage, setUser } from 'src/app/core/store/actions/user.actions';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  baseURL = Constants.SOCKET_ENDPOINT;
  images: UserImages[] = [];
  constructor(private uploadService: ImageUploadService, private dialog: MatDialog, private store: Store, private authservice: AuthService) {

  }
  ngOnInit(): void {
    this.getAllImages()
  }


  selectedFiles: any = {
    images: ''
  }

  selectFile(event: any) {
    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    Array.from(fileList).forEach((ele: any, index: number) => {
      formData.append(`images`, ele);
    })

    this.uploadService.uploadImage(formData).subscribe((data) => {
      this.getAllImages();
    });
  }

  getAllImages() {
    this.uploadService.getAlImages().subscribe(
      (data: any) => {
        this.images = data.data;
        this.store.dispatch(setProfileImage({ url: data.data[0].imgurl }));
        const user = this.authservice.getuser()
        user.img = data.data[0].imgurl
        this.store.dispatch(setUser({ user: user }))
      });
  }

  openDialog(id: number = 0) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: true, data: { id }, });
    dialogRef.afterClosed().subscribe(res => {
      res.id && this.uploadService.removeImage(res.id).subscribe((data) => {
        console.log(data);
        this.getAllImages();
      })
    })
  }
}
