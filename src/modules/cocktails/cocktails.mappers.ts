import { Cocktail } from './cocktail.entity';
import { IngredientsMappers } from '../ingredients/ingredients.mappers';
import { PreparaionStepsMappers } from '../preparation-steps/preparaion-steps.mappers';
import { UserDto } from '../users/dto/userDto';
import { UsersMappers } from '../users/users.mappers';
import {CocktailDto} from "./dto/cocktailDto";
import {PreparationStepDto} from "../preparation-steps/dto/preparationStepDto";
import {CocktailListItemDto} from "./dto/cocktailListItemDto";
import {IngredientDto} from "../ingredients/dtos/ingredientDto";

export class CocktailsMappers {
  public static mapCocktailToCocktailDto(cocktail: Cocktail): CocktailDto {
    const ingredientsDto: IngredientDto[] = cocktail.ingredientItem.map(
      IngredientsMappers.mapIngredientItemToIngredientDto,
    );

    const preparationStepsDto: PreparationStepDto[] = cocktail.preparation.map(
      PreparaionStepsMappers.mapPreparationStepToPreparationStepDto,
    );

    const authorDto: UserDto = UsersMappers.userToUserDto(cocktail.author);

    return {
      id: cocktail.id,
      name: cocktail.name,
      description: cocktail.description,
      imageUrl: cocktail.imageUrl,
      category: cocktail.category,
      difficulty: cocktail.difficulty,
      preparation: preparationStepsDto,
      ingredients: ingredientsDto,
      author: authorDto,
    };
  }

  public static mapCocktailToCocktailListItemDto(
    cocktail: Cocktail,
  ): CocktailListItemDto {
    const userDto: UserDto = UsersMappers.userToUserDto(cocktail.author);

    return {
      id: cocktail.id,
      name: cocktail.name,
      description: cocktail.description,
      imageUrl: cocktail.imageUrl,
      category: cocktail.category,
      difficulty: cocktail.difficulty,
      author: userDto,
    };
  }
}
