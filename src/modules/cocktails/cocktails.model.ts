import { IngredientDto } from '../ingredients/ingredients.model';
import { Action } from '../preparation-steps/preparation-steps.model';
import { UserDto } from '../users/dto/userDto';

export interface CocktailDto {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  difficulty: Difficulty;
  preparation: PreparationStepDto[];
  ingredients: IngredientDto[];
  author: UserDto;
}

export type CocktailRequest = Omit<CocktailDto, 'id'>;

export interface PreparationStepDto {
  step: number;
  ingredient: string;
  action: Action;
  tip: string;
}

export enum Category {
  shot = 1,
  short = 2,
  long = 3,
  other = 4,
}

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}
