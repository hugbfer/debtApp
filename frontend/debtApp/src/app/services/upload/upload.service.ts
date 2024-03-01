import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadItemInterface } from '../../interfaces/upload/upload.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  listUploadItems(pagination: any): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/upload/file-upload-list/', {
      params: {
        limit: pagination.rows,
        offset: pagination.rows * (pagination.page - 1),
      },
    });
  }

  uploadNewFile(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('file_name', file.name);
    return this.http.post(
      'http://localhost:8000/upload/file-upload/',
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
