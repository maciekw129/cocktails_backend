import {Unit} from "../ingredients.model";
import {IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString, Max, Min} from "class-validator";

export class IngredientDto {
  @IsString()
  @IsNotEmpty({message: 'Name cant be empty'})
  @Max(255)
  name: string;

  @IsInt()
  @IsNotEmpty()
  @Max(10000, {message: 'Quantity can have max 10000'})
  @Min(1, {message: 'Quantity must be at least 1'})
  quantity: number;

  @IsEnum(Unit)
  @IsNotEmpty({message: 'Unit cant be empty'})
  unit: Unit;

  @IsBoolean()
  @IsNotEmpty({message: 'Alcoholic cant be empty'})
  isAlcoholic: boolean;
}
