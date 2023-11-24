import { CommonModule, Location } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { camelCase } from 'lodash';
import { Observable } from 'rxjs';
import { Pizza, PizzaDefault, Size } from '../../models/pizza.model';
import { PizzaService } from './../../services/pizza.service';

type PizzaFormGroup = {
  name: FormControl<string>,
  ingredients: FormControl<string>,
  imageUrl: FormControl<string | null>,
  size: FormControl<Size | null>,
  weigth: FormControl<number | null>,
  price: FormControl<number | null>,
  isNew: FormControl<boolean>
};

@Component({
  selector: 'app-pizza-form',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pizza-form.component.html',
  styleUrl: './pizza-form.component.scss'
})
export class PizzaFormComponent implements OnInit {
  pizza!: Pizza | PizzaDefault;
  imagesUrl!: Observable<string[]>;
  isEdit = false;
  sizes = Object.values(Size);

  pizzaForm = new FormGroup<PizzaFormGroup>({
    name: new FormControl<string>('', { nonNullable: true }),
    ingredients: new FormControl('', { nonNullable: true }),
    imageUrl: new FormControl(null),
    size: new FormControl( null),
    weigth: new FormControl(null),
    price: new FormControl(null),
    isNew: new FormControl(false, { nonNullable: true })
  });

  constructor(
    @Inject(PizzaService) private pizzaService: PizzaService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.imagesUrl = this.pizzaService.getImagesURL();
    this.activatedRoute.data.subscribe(({ isEdit }) => {
      this.isEdit = Boolean(isEdit);
      if (this.isEdit) {
        const { id } = this.activatedRoute.snapshot.params;
        this.validateId(id);

        this.pizzaService.getById(id).subscribe((pizza) => {
          this.pizza = pizza;
          Object.entries(pizza).forEach(([key, value]) => {
            this.pizzaForm.get(camelCase(key))?.patchValue(value);
          });
        });
      }
    });
  }

  onSubmit() {
    if (!this.pizzaForm.valid) {
      if (this.pizzaForm.controls.size.invalid) {
        this.pizzaForm.controls.size.markAsDirty();
      }

      return;
    }

    const { name, ingredients, imageUrl, size, weigth, price, isNew } = this.pizzaForm.controls;
    const pizza: Pizza = {
      name: name.value,
      ingredients: ingredients.value,
      image_url: imageUrl.value as string,
      size: size.value as Size,
      weigth: weigth.value as number,
      price: price.value as number,
      isNew: isNew.value
    };

    if (this.isEdit) {
      pizza['id'] = this.pizza.id;
      this.pizzaService.update(pizza);
    } else {
      this.pizzaService.create(pizza);
    }

    this.router.navigate(['admin']);
  }

  deletePizza() {
    if (!this.pizza.id) {
      throw new Error('Pizza ID is not defined');
    }

    this.pizzaService.delete(this.pizza.id);
    this.router.navigate(['admin']);
  }

  resetForm() {
    this.pizzaForm.reset();
  }

  goBack() {
    this.location.back();
  }

  private validateId(id: unknown) {
    if (!Number(id)) {
      throw new Error(`'${id}' is not a positive number`);
    }
  }
}
