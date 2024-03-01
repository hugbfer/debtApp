import { Component, Pipe } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import {
  UploadItemInterface,
  UploadStatusEnum,
  UploadStatusType,
} from '../../interfaces/upload/upload.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrl: './list-upload.component.scss',
})
export class ListUploadComponent {
  uploadItems: UploadItemInterface[] = [];

  pagination = { page: 1, rows: 10, count: 0 };

  $listUploadItems: Subscription | null = null;

  pageState = {
    hasError: false,
    loading: false,
  };

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
    this.loadUploadItems();
  }

  loadUploadItems() {
    this.pageState.loading = true;
    this.$listUploadItems = this.uploadService
      .listUploadItems(this.pagination)
      .subscribe(
        (result: any) => {
          this.uploadItems = result.results;
          this.pagination.count = result.count;
          this.pageState.hasError = false;
          this.pageState.loading = false;
        },
        (error) => {
          this.pageState.hasError = true;
          this.pageState.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.$listUploadItems) {
      this.$listUploadItems.unsubscribe();
    }
  }
}

@Pipe({
  name: 'status',
})
export class StatusPipe {
  transform(value: UploadStatusType): string {
    return UploadStatusEnum[value];
  }
}
