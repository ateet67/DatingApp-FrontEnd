import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from "../../../core/service/image-upload.service";
import { UserImages } from 'src/app/shared/interfaces/user-images.type';
import { Constants } from 'src/app/config/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images: UserImages[] = [];
  constructor(private uploadService: ImageUploadService, private dialog: MatDialog) {

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
        this.images.forEach((ele: UserImages) => {
          ele.imgurl = Constants.API_ENDPOINT.replace("/api", "") + ele.imgurl;
        });
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
