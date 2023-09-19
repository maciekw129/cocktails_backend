import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './cocktail.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CocktailRequest, Filters } from './cocktails.model';
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

  public async getAllCocktails(filters: Filters) {
    const hasIngredientFilters = Boolean(filters.ingredients);
    const cocktailsQuery = this.cocktailRepository
      .createQueryBuilder('cocktail')
      .leftJoinAndSelect('cocktail.ingredientItem', 'ingredientItem')
      .leftJoinAndSelect('ingredientItem.ingredient', 'ingredient')
      .where('cocktail.name like :name', { name: `%${filters.name ?? ''}%` });

    if (filters.difficulty) {
      cocktailsQuery.andWhere(`difficulty = ${filters.difficulty}`);
    }

    if (filters.category) {
      cocktailsQuery.andWhere(`category = ${filters.category}`);
    }

    if (hasIngredientFilters) {
      if (!Array.isArray(filters.ingredients))
        filters.ingredients = [filters.ingredients];

      filters.ingredients.forEach((ingredient, index) => {
        index === 0
          ? cocktailsQuery.andWhere(`ingredient.name = '${ingredient}'`)
          : cocktailsQuery.orWhere(`ingredient.name = '${ingredient}'`);
      });
    }

    let cocktails = await cocktailsQuery.getMany();

    if (hasIngredientFilters) {
      cocktails = cocktails.filter(
        ({ ingredientItem }) =>
          ingredientItem.length === filters.ingredients.length,
      );
    }

    return cocktails.map(CocktailsMappers.mapCocktailToCocktailListItemDto);
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
