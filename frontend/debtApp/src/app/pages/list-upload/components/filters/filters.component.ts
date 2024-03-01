import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../../../services/upload/upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() onUploadSucccessfull = new EventEmitter();
  private modalService = inject(NgbModal);
  closeResult = '';

  requiredFileType = 'text/csv';

  fileForm = new FormGroup({ file: new FormControl(null) });
  fileToUpload: File | null = null;
  uploading = false;
  upload_percentage = 0;

  constructor(private uploadService: UploadService) {}

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.uploading = false;
          this.upload_percentage = 0;
          this.closeResult = `Dismissed`;
        }
      );
  }

  sendFile() {
    if (this.fileToUpload) {
      this.uploading = true;
      this.uploadService.uploadNewFile(this.fileToUpload).subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.upload_percentage = Math.round(
            100 * (event.loaded / event.total)
          );
        } else if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this.onUploadSucccessfull.emit('');
          }
          this.modalService.dismissAll();
        }
      });
    }
  }

  fileChange(event: any) {
    this.fileForm.controls['file'].setErrors({ filetype: false });
    const file: File = event.target.files[0];
    if (file && file.type == this.requiredFileType) {
      this.fileToUpload = file;
    } else {
      this.fileForm.controls['file'].patchValue(null);
      this.fileForm.controls['file'].setErrors({ filetype: true });
      this.fileToUpload = null;
    }
  }
}
