import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUploadComponent } from './list-upload.component';
import { ProgressComponent } from './components/progress/progress.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListUploadComponent', () => {
  let component: ListUploadComponent;
  let fixture: ComponentFixture<ListUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUploadComponent, FiltersComponent],
      imports: [
        HttpClientTestingModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
