import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CurrencyBRFormat, DebtsListComponent } from './debts-list.component';
import { DebtsService } from '../../services/debts/debts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebtFiltersComponent } from './components/debt-filters/debt-filters.component';

describe('DebtsListComponent', () => {
  let component: DebtsListComponent;
  let fixture: ComponentFixture<DebtsListComponent>;
  let mockDebtsService: jasmine.SpyObj<DebtsService>;

  beforeEach(() => {
    const activatedRouteMock = {
      params: of({ id: 123 }),
    };

    mockDebtsService = jasmine.createSpyObj('DebtsService', [
      'listDebitsByUpload',
    ]);
    TestBed.configureTestingModule({
      declarations: [
        DebtsListComponent,
        DebtFiltersComponent,
        CurrencyBRFormat,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: DebtsService, useValue: mockDebtsService },
        DebtsService,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(DebtsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component with HTML elements', () => {
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.title');
    const filterComponent =
      fixture.nativeElement.querySelector('app-debt-filters');

    expect(titleElement).toBeTruthy();
    expect(filterComponent).toBeTruthy();
  });

  it('should display loading message when loading', () => {
    component.pageState.loading = true;
    fixture.detectChanges();

    const loadingMessage = fixture.nativeElement.querySelector('.message');
    expect(loadingMessage.textContent).toContain('Carregando...');
  });

  it('should display error message when there is an error', fakeAsync(() => {
    fixture.detectChanges();
    component.pageState.hasError = true;
    component.pageState.loading = false;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.message');
    expect(errorMessage.textContent).toContain(
      'Ocorreu um erro ao realizar a busca'
    );
  }));

  it('should display "Nenhum registro encontrado" message when no data is available', fakeAsync(() => {
    component.debitsItems = [];
    fixture.detectChanges();
    component.pageState.loading = false;
    fixture.detectChanges();

    const noRecordMessage = fixture.nativeElement.querySelector('.message');
    expect(noRecordMessage.textContent).toContain('Nenhum registro encontrado');
  }));

  it('should display data when data is available', fakeAsync(() => {
    fixture.detectChanges();

    const fakeResult = {
      pagination: { count: 1, next: false, previous: false, page: 0, rows: 10 },
      data: [
        {
          _id: { $oid: '65df755559c4027944be123c' },
          name: 'William Bush',
          governmentId: 5079,
          email: 'stevensonmatthew@example.org',
          debtAmount: 7693,
          debtDueDate: '2022-10-05',
          debtId: '5ae49c17-6d88-4e7a-a4bd-403b7080ffe2',
          upload_id: 13,
        },
      ],
    };
    component.pageState.loading = false;
    component.debitsItems = fakeResult.data;
    fixture.detectChanges();
    tick();

    const dataElement = fixture.nativeElement.querySelector('#data_list');
    expect(dataElement).toBeTruthy();
  }));
});
