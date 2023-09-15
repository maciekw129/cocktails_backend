import { Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './cocktail.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import {
  CocktailDto,
  CocktailRequest,
  PreparationStepDto,
} from './cocktails.model';
import { IngredientDto } from '../ingredients/ingredients.model';
import { PreparationStepService } from '../preparation-step/preparation-step.service';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    private ingredientsService: IngredientsService,
    private preparationStepService: PreparationStepService,
    private usersService: UsersService,
  ) {}

  public async getAllCocktails() {
    const cocktails = await this.cocktailRepository.find({
      relations: {
        ingredientItem: {
          ingredient: true,
        },
        preparation: {
          ingredient: true,
        },
      },
    });

    return cocktails.map(this.mapCocktailToCocktailDto);
  }

  public async createCocktail(cocktail: CocktailRequest, userId: number) {
    const user = await this.usersService.findUserById(userId);

    const ingredientItems =
      await this.ingredientsService.generateIngredientItems(
        cocktail.ingredients,
      );

    const preparationSteps =
      await this.preparationStepService.generatePreparationSteps(
        cocktail.preparation,
      );

    const newCocktail = this.cocktailRepository.create({
      name: cocktail.name,
      description: cocktail.description,
      category: cocktail.category,
      difficulty: cocktail.difficulty,
      preparation: preparationSteps,
      author: user,
      comments: [],
      ratings: [],
      ingredientItem: ingredientItems,
    });

    return this.cocktailRepository.save(newCocktail);
  }

  private mapCocktailToCocktailDto(cocktail: Cocktail): CocktailDto {
    const ingredientsDto: IngredientDto[] = cocktail.ingredientItem.map(
      (ingredient) => {
        return {
          name: ingredient.ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          isAlcoholic: ingredient.ingredient.isAlcoholic,
        };
      },
    );

    const preparationStepsDto: PreparationStepDto[] = cocktail.preparation.map(
      (preparation) => {
        return {
          step: preparation.step,
          ingredient: preparation.ingredient.name,
          action: preparation.action,
          tip: preparation.tip,
        };
      },
    );

    return {
      id: cocktail.id,
      name: cocktail.name,
      description: cocktail.description,
      category: cocktail.category,
      difficulty: cocktail.difficulty,
      preparation: preparationStepsDto,
      ingredients: ingredientsDto,
    };
  }
}
