import { IngredientDto } from '../ingredients/ingredients.model';

export interface CocktailDto {
  name: string;
  description: string;
  preparation: string;
  ingredients: IngredientDto[];
}
