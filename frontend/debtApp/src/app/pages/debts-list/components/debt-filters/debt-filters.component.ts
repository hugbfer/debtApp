import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-debt-filters',
  templateUrl: './debt-filters.component.html',
  styleUrl: './debt-filters.component.scss',
})
export class DebtFiltersComponent {
  filters = new FormGroup({
    email: new FormControl(null),
    governmentId: new FormControl(null),
  });

  @Output() applyFilter = new EventEmitter();

  sendApplyFilter() {
    const values = this.filters.value;
    this.applyFilter.emit(values);
  }
}
