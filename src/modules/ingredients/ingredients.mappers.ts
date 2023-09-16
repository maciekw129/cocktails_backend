import { IngredientItem } from './entities/ingredientItem.entity';
import { IngredientDto } from './ingredients.model';

export class IngredientsMappers {
  public static mapIngredientItemToIngredientDto(
    ingredientItem: IngredientItem,
  ): IngredientDto {
    return {
      name: ingredientItem.ingredient.name,
      quantity: ingredientItem.quantity,
      unit: ingredientItem.unit,
      isAlcoholic: ingredientItem.ingredient.isAlcoholic,
    };
  }
}
