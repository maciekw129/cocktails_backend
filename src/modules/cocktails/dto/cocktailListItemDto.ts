import {Category, Difficulty} from "../cocktails.model";
import {UserDto} from "../../users/dto/userDto";


export class CocktailListItemDto {
  readonly id: number;

  readonly name: string;

  readonly description: string;

  readonly imageUrl: string;

  readonly category: Category;

  readonly difficulty: Difficulty;

  readonly author: UserDto;
}
