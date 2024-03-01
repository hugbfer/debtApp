import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebtsService } from './debts.service';

describe('DebtsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DebtsService],
    });
  });

  it('should be created', inject([DebtsService], (service: DebtsService) => {
    expect(service).toBeTruthy();
  }));

  it('should call listDebitsByUpload with correct parameters', inject(
    [DebtsService, HttpTestingController],
    (service: DebtsService, httpMock: HttpTestingController) => {
      const pagination = { rows: 10, page: 1 };
      const filters = {
        governmentId: '123',
        email: 'test@example.com',
        upload_id: '456',
      };

      service.listDebitsByUpload(pagination, filters).subscribe();

      const req = httpMock.expectOne(
        'http://localhost:8000/boleto/list-debts/?governmentId=123&email=test@example.com&upload_id=456&rows=10&page=1'
      );

      expect(req.request.method).toBe('GET');
      httpMock.verify();
    }
  ));

  it('should call listDebitsByUpload without optional filters', inject(
    [DebtsService, HttpTestingController],
    (service: DebtsService, httpMock: HttpTestingController) => {
      const pagination = { rows: 10, page: 1 };
      const filters = {};

      service.listDebitsByUpload(pagination, filters).subscribe();

      const req = httpMock.expectOne(
        'http://localhost:8000/boleto/list-debts/?rows=10&page=1'
      );

      expect(req.request.method).toBe('GET');
      httpMock.verify();
    }
  ));
});
