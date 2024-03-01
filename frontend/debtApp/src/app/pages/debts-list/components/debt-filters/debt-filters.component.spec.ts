import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtFiltersComponent } from './debt-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DebtFiltersComponent', () => {
  let component: DebtFiltersComponent;
  let fixture: ComponentFixture<DebtFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtFiltersComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
