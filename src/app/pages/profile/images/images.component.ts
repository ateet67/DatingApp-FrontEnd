import { Component } from '@angular/core';
import { ImageUploadService } from "../../../core/service/image-upload.service";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {

  constructor(private uploadService: ImageUploadService) {

  }


  selectedFiles: any = {
    images: ''
  }

  obj2FormData(obj: any, form?: any, namespace?: any) {
    var fd = form || new FormData();
    var formKey;

    for (var property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + "[" + property + "]";
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (
          typeof obj[property] === "object" &&
          !(obj[property] instanceof File)
        ) {
          this.obj2FormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  }

  selectFile(event: any) {
    let fileList: FileList = event.target.files;
    let formData: FormData = new FormData();
    Array.from(fileList).forEach((ele: any, index: number) => {
      formData.append(`images`, ele);
    })

    this.uploadService.uploadImage(formData).subscribe((data) => {
      console.log(data);
    });
  }

}
