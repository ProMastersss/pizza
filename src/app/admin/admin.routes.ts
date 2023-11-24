import { Routes } from '@angular/router';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaListComponent } from './containers/pizza-list/pizza-list.component';

export const routes: Routes = [
  { path: '', pathMatch: "full", component: PizzaListComponent },
  { path: 'new', component: PizzaFormComponent, data: { isEdit: false } },
  { path: 'pizza/:id', component: PizzaFormComponent, data: { isEdit: true } }
];
