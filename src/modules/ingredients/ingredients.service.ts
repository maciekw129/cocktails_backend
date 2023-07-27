import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { IngredientItem } from './entities/ingredientItem.entity';
import { IngredientDto } from './ingredients.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    @InjectRepository(IngredientItem)
    private ingredientItemRepository: Repository<IngredientItem>,
  ) {}

  public getAllIngredients() {
    return this.ingredientsRepository.findBy({});
  }

  public async generateIngredientItems(ingredients: IngredientDto[]) {
    const ingredientsItemsArray: IngredientItem[] = [];

    for (const ingredient of ingredients) {
      const existingIngredient = await this.findIngredientByName(
        ingredient.name,
      );

      const newIngredientItem = this.ingredientItemRepository.create({
        unit: ingredient.unit,
        quantity: ingredient.quantity,
      });

      if (existingIngredient) {
        newIngredientItem.ingredient = existingIngredient;
      } else {
        newIngredientItem.ingredient = await this.addIngredient(
          ingredient.name,
          ingredient.isAlcoholic,
        );
      }

      await this.ingredientItemRepository.save(newIngredientItem);
      ingredientsItemsArray.push(newIngredientItem);
    }

    return ingredientsItemsArray;
  }

  public findIngredientByName(name: string) {
    return this.ingredientsRepository.findOneBy({ name });
  }

  private addIngredient(name: string, isAlcoholic: boolean) {
    const newCocktail = this.ingredientsRepository.create({
      name,
      isAlcoholic,
    });

    return this.ingredientsRepository.save(newCocktail);
  }
}
