import {IsAlphanumeric, IsEnum, IsNotEmpty, IsOptional, MaxLength, ValidateNested} from "class-validator";
import {Category, Difficulty} from "../cocktails.model";
import {PreparationStepDto} from "../../preparation-steps/dto/preparationStepDto";
import {IngredientDto} from "../../ingredients/dtos/ingredientDto";

export class CreateCocktailDto {
  @IsNotEmpty({message: 'Name cant be empty'})
  @IsAlphanumeric()
  name: string;

  @MaxLength(3000, {message: 'Description max length is 3000'})
  @IsOptional()
  description: string;

  @IsNotEmpty({message: 'Image url cant be empty'})
  imageUrl: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty;

  @ValidateNested()
  @IsNotEmpty()
  preparation: PreparationStepDto[];

  @ValidateNested()
  @IsNotEmpty()
  ingredients: IngredientDto[];
}
