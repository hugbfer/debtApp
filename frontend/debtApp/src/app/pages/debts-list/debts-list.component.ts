import { Component, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UploadService } from '../../services/upload/upload.service';
import { DebtsService } from '../../services/debts/debts.service';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrl: './debts-list.component.scss',
})
export class DebtsListComponent {
  private $sub: Subscription | null = null;
  private $listDebtsList: Subscription | null = null;

  debitsItems: any[] = [];

  pagination = {
    page: 0,
    rows: 10,
    count: 0,
    previous: false,
    next: false,
    last: 0,
  };

  pageState = {
    hasError: false,
    loading: false,
  };

  filters: any = {
    email: null,
    governmentId: null,
    upload_id: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private debitService: DebtsService
  ) {}

  ngOnInit(): void {
    this.$sub = this.route.params.subscribe((params) => {
      this.filters.upload_id = params['id'];
    });
    this.loadDebtsList();
  }

  sendMail(email: string) {
    this.debitService.sendMail(email).subscribe(
      (data) => {
        alert('email enviado com sucesso');
      },
      (error) => {
        alert('falha ao enviar email');
      }
    );
  }

  loadDebtsList() {
    this.pageState.loading = true;

    this.$listDebtsList = this.debitService
      .listDebitsByUpload(this.pagination, this.filters)
      .subscribe(
        (result: any) => {
          this.debitsItems = result.data;
          this.pagination = result.pagination;
          this.pagination['last'] =
            result.pagination.count / result.pagination.rows;

          this.pageState.hasError = false;
          this.pageState.loading = false;
        },
        (error) => {
          this.pageState.hasError = true;
          this.pageState.loading = false;
        }
      );
  }

  applyFilters(filters: any) {
    this.filters = { ...this.filters, ...filters };
    this.resetPagination();
    this.loadDebtsList();
  }

  changePage(value: number) {
    this.pagination.page = value;
    this.loadDebtsList();
  }

  previousPage() {
    if (this.pagination.previous) {
      this.pagination.page = this.pagination.page - 1;
      this.loadDebtsList();
    }
  }

  nextPage() {
    if (this.pagination.next) {
      this.pagination.page = this.pagination.page + 1;
      this.loadDebtsList();
    }
  }

  resetPagination() {
    this.pagination = {
      page: 0,
      rows: 10,
      count: 0,
      previous: false,
      next: false,
      last: 0,
    };
  }

  ngOnDestroy(): void {
    if (this.$listDebtsList) {
      this.$listDebtsList.unsubscribe();
    }

    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }
}

@Pipe({
  name: 'currencyBR',
})
export class CurrencyBRFormat {
  transform(
    value: number,
    currencySign: string = 'R$ ',
    decimalLength: number = 2,
    chunkDelimiter: string = '.',
    decimalDelimiter: string = ',',
    chunkLength: number = 3
  ): string {
    let result =
      '\\d(?=(\\d{' +
      chunkLength +
      '})+' +
      (decimalLength > 0 ? '\\D' : '$') +
      ')';
    let num = value.toFixed(Math.max(0, ~~decimalLength));

    return (
      currencySign +
      (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(
        new RegExp(result, 'g'),
        '$&' + chunkDelimiter
      )
    );
  }
}
