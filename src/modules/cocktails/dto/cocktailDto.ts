import {UserDto} from "../../users/dto/userDto";
import {Category, Difficulty} from "../cocktails.model";
import {PreparationStepDto} from "../../preparation-steps/dto/preparationStepDto";
import {IngredientDto} from "../../ingredients/dtos/ingredientDto";

export class CocktailDto {
  readonly id: number;

  readonly name: string;

  readonly description: string;

  readonly imageUrl: string;

  readonly category: Category;

  readonly difficulty: Difficulty;

  readonly preparation: PreparationStepDto[];

  readonly ingredients: IngredientDto[];

  readonly author: UserDto;
}
