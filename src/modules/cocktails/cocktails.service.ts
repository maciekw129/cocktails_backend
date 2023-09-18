import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './cocktail.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CocktailRequest } from './cocktails.model';
import { PreparationStepsService } from '../preparation-steps/preparation-steps.service';
import { CocktailsMappers } from './cocktails.mappers';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    private ingredientsService: IngredientsService,
    private preparationStepService: PreparationStepsService,
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
        author: true,
      },
    });

    return cocktails.map(CocktailsMappers.mapCocktailToCocktailDto);
  }

  public async getCocktailById(cocktailId: number) {
    const cocktail = await this.cocktailRepository.findOne({
      where: { id: cocktailId },
      relations: {
        ingredientItem: {
          ingredient: true,
        },
        preparation: {
          ingredient: true,
        },
        author: true,
      },
    });

    if (!cocktail) {
      throw new NotFoundException('Cocktail not found');
    }

    return CocktailsMappers.mapCocktailToCocktailDto(cocktail);
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
      imageUrl: cocktail.imageUrl,
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
}
