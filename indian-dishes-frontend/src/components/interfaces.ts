export interface Dish {
  name: string;
  ingredients: string;
  diet: string;
  prep_time: number | null;
  cook_time: number | null;
  flavor_profile: string | null;
  course: string;
  state: string | null;
  region: string | null;
}

export interface DishesList {
  dishes: Dish[]
}