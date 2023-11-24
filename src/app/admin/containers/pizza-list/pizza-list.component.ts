import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PizzaCardComponent } from '../../components/pizza-card/pizza-card.component';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PizzaCardComponent, MatButtonModule],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.scss'
})
export class PizzaListComponent {
  list: Observable<Pizza[]>;

  constructor(@Inject(PizzaService) private pizzaService: PizzaService) {
    this.list = this.pizzaService.list();
  }
}
