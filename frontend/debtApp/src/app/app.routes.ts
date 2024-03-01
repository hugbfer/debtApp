import { Routes } from '@angular/router';
import { ListUploadComponent } from './pages/list-upload/list-upload.component';
import { DebtsListComponent } from './pages/debts-list/debts-list.component';

export const routes: Routes = [
  { title: 'Listar Uploads', path: '', component: ListUploadComponent },
  { title: 'Listar Débitos', path: 'debts', component: DebtsListComponent },
];
