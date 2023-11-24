import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Event, Router } from '@angular/router';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.scss',
  host: {
    '(click)': 'goTo($event)'
  }
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;

  constructor(private router: Router) { }

  goTo(event: Event) {
    this.router.navigate(['admin/pizza/' + this.pizza.id]);
  }
}
