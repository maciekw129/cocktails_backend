import { IngredientDto } from '../ingredients/ingredients.model';

export interface CocktailDto {
  name: string;
  description: string;
  preparation: PreparationStepDto[];
  ingredients: IngredientDto[];
}

export interface PreparationStepDto {
  ingredient: string;
  action: string;
  tip: string;
}
