import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Pizza, PizzaDefault } from '../models/pizza.model';

@Injectable({
  providedIn: null
})
export class PizzaService {
  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Pizza | PizzaDefault> {
    return this.httpClient.get<Pizza>('/api/pizza/' + id).pipe(
      catchError(() => of(
      {
        name: '',
        ingredients: '',
        image_url: null,
        weigth: null,
        size: null,
        price: null,
        isNew: false
      }
    )));
  }

  list(): Observable<Pizza[]> {
    return this.httpClient.get<Pizza[]>('/api/pizza');
  }

  getImagesURL(): Observable<string[]> {
    return this.httpClient.get<Pizza[]>('/api/pizza').pipe(
      map(response => response.reduce<string[]>((acc, pizza) => {
        acc.push(pizza.image_url);
        return acc;
      }, []))
    );
  }

  create(pizza: Pizza): void {
    this.httpClient.post<void>(
      '/api/pizza',
      pizza,
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe();
  }

  update(pizza: Pizza) {
    this.httpClient.put<void>(
      '/api/pizza/' + pizza.id,
      pizza,
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe();
  }

  delete(id: number) {
    this.httpClient.delete<void>('/api/pizza/' + id).subscribe();
  }
}
