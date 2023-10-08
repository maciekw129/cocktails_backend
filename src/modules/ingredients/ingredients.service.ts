import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';
import { IngredientItem } from './entities/ingredientItem.entity';
import {IngredientDto} from "./dtos/ingredientDto";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
    @InjectRepository(IngredientItem)
    private ingredientItemRepository: Repository<IngredientItem>,
  ) {}

  public getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientsRepository
      .createQueryBuilder()
      .getMany()
  }

  public async generateIngredientItems(ingredients: IngredientDto[]): Promise<IngredientItem[]> {
    const ingredientsItemsArray: IngredientItem[] = [];

    for (const ingredient of ingredients) {
      const existingIngredient = await this.findIngredientByName(
        ingredient.name,
      );

      const newIngredientItem = new IngredientItem();
      newIngredientItem.unit = ingredient.unit;
      newIngredientItem.quantity = ingredient.quantity;

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

  public findIngredientByName(name: string): Promise<Ingredient> {
    return this.ingredientsRepository
      .createQueryBuilder('ingredient')
      .where('ingredient.name like :name', { name })
      .getOne()
  }

  private addIngredient(name: string, isAlcoholic: boolean): Promise<Ingredient> {
    const newCocktail = this.ingredientsRepository.create({
      name,
      isAlcoholic,
    });

    return this.ingredientsRepository.save(newCocktail);
  }
}
