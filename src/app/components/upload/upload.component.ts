import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    // console.log(fileToUpload);
    const formData = new FormData();
    let file = formData.append('file', fileToUpload, fileToUpload.name);

    console.log(file);
    this.http.post('http://localhost:5000/api/images', formData, { reportProgress: true, observe: 'events' })
      .subscribe((event: any) => {

        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }

      }), (err: Error) => {
        console.log(err.name + ' ' + err.message);
      }
  }


}
