import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebtsService {
  constructor(private http: HttpClient) {}

  listDebitsByUpload(pagination: any, filters: any): Observable<any> {
    if (!filters['governmentId'] || filters['governmentId'] == '') {
      delete filters['governmentId'];
    }

    if (!filters['email'] || filters['email'] == '') {
      delete filters['email'];
    }

    if (!filters['upload_id'] || filters['upload_id'] == '') {
      delete filters['upload_id'];
    }

    return this.http.get('http://localhost:8000/boleto/list-debts/', {
      params: {
        ...filters,
        rows: pagination.rows,
        page: pagination.page,
      },
    });
  }

  sendMail(email: string): Observable<any> {
    return this.http.get('http://localhost:8000/boleto/send-mail/', {
      params: { email: email },
    });
  }
}
