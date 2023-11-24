export interface Pizza {
  id?: number,
  name: string,
  ingredients: string,
  image_url: string,
  weigth: number,
  size: Size,
  price: number,
  isNew: boolean
}

type Nullable<T> = { [P in keyof T]: T[P] | null };
type Optional<T, K extends keyof T> = Pick<Nullable<T>, K> & Omit<T, K>;

export type PizzaDefault = Optional<Pizza, "image_url" | "weigth" | "size" | "price">

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}
