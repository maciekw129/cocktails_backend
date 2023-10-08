import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './cocktail.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import {
  CocktailsParams,
} from './cocktails.model';
import { PreparationStepsService } from '../preparation-steps/preparation-steps.service';
import { CocktailsMappers } from './cocktails.mappers';
import { PageMetaDto } from '../../shared/pagination/pageMetaDto';
import { PageDto } from '../../shared/pagination/pageDto';
import {CreateCocktailDto} from "./dto/createCocktailDto";
import {CocktailListItemDto} from "./dto/cocktailListItemDto";
import {PageOptionsDto} from "../../shared/pagination/PageOptionsDto";

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    private ingredientsService: IngredientsService,
    private preparationStepService: PreparationStepsService,
    private usersService: UsersService,
  ) {}

  public async getAllCocktails({
    name,
    category,
    difficulty,
    ingredients,
    userId,
    page
  }: CocktailsParams): Promise<PageDto<CocktailListItemDto>> {
    const hasIngredientFilters = Boolean(ingredients);
    const pageOptionsDto = new PageOptionsDto(page);

    const cocktailsQuery = this.cocktailRepository
      .createQueryBuilder('cocktail')
      .leftJoinAndSelect('cocktail.ingredientItem', 'ingredientItem')
      .leftJoinAndSelect('ingredientItem.ingredient', 'ingredient')
      .leftJoinAndSelect('cocktail.author', 'author')
      .skip(pageOptionsDto.skip)
      .take(10)
      .where('cocktail.name like :name', { name: `%${name ?? ''}%` });

    if (difficulty) {
      cocktailsQuery.andWhere(`difficulty = ${difficulty}`);
    }

    if (category) {
      cocktailsQuery.andWhere(`category = ${category}`);
    }

    if (userId) {
      cocktailsQuery.andWhere(`author.id = ${userId}`);
    }

    if (hasIngredientFilters) {
      if (!Array.isArray(ingredients)) ingredients = [ingredients];

      ingredients.forEach((ingredient, index) => {
        index === 0
          ? cocktailsQuery.andWhere(`ingredient.name = '${ingredient}'`)
          : cocktailsQuery.orWhere(`ingredient.name = '${ingredient}'`);
      });
    }

    let cocktails = await cocktailsQuery.getMany();

    if (hasIngredientFilters) {
      cocktails = cocktails.filter(
        ({ ingredientItem }) => ingredientItem.length === ingredients.length,
      );
    }

    const itemCount = await cocktailsQuery.getCount();
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount,
    });

    return new PageDto(
      cocktails.map(CocktailsMappers.mapCocktailToCocktailListItemDto),
      pageMetaDto,
    );
  }

  public async getCocktailById(cocktailId: number) {
    const cocktail = await this.cocktailRepository
      .createQueryBuilder('cocktail')
      .leftJoinAndSelect('cocktail.ingredientItem', 'ingredientItem')
      .leftJoinAndSelect('ingredientItem.ingredient', 'ingredient')
      .leftJoinAndSelect('cocktail.author', 'author')
      .leftJoinAndSelect('cocktail.preparation', 'preparation')
      .where('cocktail.id like :id', { id: cocktailId })
      .getOne()

    if (!cocktail) {
      throw new NotFoundException('Cocktail not found');
    }

    return CocktailsMappers.mapCocktailToCocktailDto(cocktail);
  }

  public async createCocktail(cocktail: CreateCocktailDto, userId: number) {
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
