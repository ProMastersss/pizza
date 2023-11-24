import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './admin.routes';
import { PizzaService } from './services/pizza.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [provideHttpClient(withFetch()), PizzaService]
})
export class AdminModule { }
