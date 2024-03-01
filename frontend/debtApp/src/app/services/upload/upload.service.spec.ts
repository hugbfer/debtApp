import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UploadService } from './upload.service';
import { UploadItemInterface } from '../../interfaces/upload/upload.interface';

describe('UploadService', () => {
  let service: UploadService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UploadService],
    });

    service = TestBed.inject(UploadService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list upload items', () => {
    const pagination = { rows: 10, page: 1 };
    const expectedUrl = 'http://127.0.0.1:8000/upload/file-upload-list/';

    const mockResponse: UploadItemInterface[] = [
      {
        id: 1,
        file_name: 'test.txt',
        file_path: '/uploads/test.txt',
        status: 'F',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    service.listUploadItems(pagination).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.length).toBe(mockResponse.length);

      response.forEach((item: any, index: any) => {
        expect(item.id).toBe(mockResponse[index].id);
        expect(item.file_name).toBe(mockResponse[index].file_name);
        expect(item.file_path).toBe(mockResponse[index].file_path);
        expect(item.status).toBe(mockResponse[index].status);
      });
    });

    const req = httpTestingController.expectOne(
      expectedUrl +
        `?limit=${pagination.rows}&offset=${
          (pagination.page - 1) * pagination.rows
        }`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should upload a new file', () => {
    const file = new File(['file content'], 'filename.txt', {
      type: 'text/plain',
    });
    const expectedUrl = 'http://localhost:8000/upload/file-upload/';

    const mockResponse: UploadItemInterface = {
      id: 1,
      file_name: 'filename.txt',
      file_path: '/uploads/filename.txt',
      status: 'P',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    req.flush(mockResponse);
  });
});
