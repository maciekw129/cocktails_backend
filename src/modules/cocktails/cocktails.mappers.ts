import { Cocktail } from './cocktail.entity';
import {
  CocktailDto,
  CocktailListItemDto,
  PreparationStepDto,
} from './cocktails.model';
import { IngredientDto } from '../ingredients/ingredients.model';
import { IngredientsMappers } from '../ingredients/ingredients.mappers';
import { PreparaionStepsMappers } from '../preparation-steps/preparaion-steps.mappers';
import { UserDto } from '../users/dto/userDto';
import { UsersMappers } from '../users/users.mappers';

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
    const ingredientsDto: IngredientDto[] = cocktail.ingredientItem.map(
      IngredientsMappers.mapIngredientItemToIngredientDto,
    );

    return {
      id: cocktail.id,
      name: cocktail.name,
      description: cocktail.description,
      imageUrl: cocktail.imageUrl,
      category: cocktail.category,
      difficulty: cocktail.difficulty,
      ingredients: ingredientsDto,
    };
  }
}
