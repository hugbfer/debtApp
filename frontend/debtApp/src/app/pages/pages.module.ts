import { ProgressComponent } from './list-upload/components/progress/progress.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ListUploadComponent,
  StatusPipe,
} from './list-upload/list-upload.component';
import { FiltersComponent } from './list-upload/components/filters/filters.component';
import { UploadService } from '../services/upload/upload.service';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DebtsService } from '../services/debts/debts.service';
import {
  CurrencyBRFormat,
  DebtsListComponent,
} from './debts-list/debts-list.component';
import { DebtFiltersComponent } from './debts-list/components/debt-filters/debt-filters.component';

@NgModule({
  declarations: [
    ListUploadComponent,
    FiltersComponent,
    ProgressComponent,
    DebtsListComponent,
    CurrencyBRFormat,
    StatusPipe,
    DebtFiltersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    RouterModule,
  ],
  providers: [UploadService, DebtsService],
})
export class PagesModule {}
