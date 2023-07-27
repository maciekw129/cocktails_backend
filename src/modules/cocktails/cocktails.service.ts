import { Injectable } from '@nestjs/common';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './cocktail.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CocktailDto } from './cocktails.model';
import { IngredientDto } from '../ingredients/ingredients.model';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailRepository: Repository<Cocktail>,
    private ingredientsService: IngredientsService,
    private usersService: UsersService,
  ) {}

  public async getAllCocktails() {
    const cocktails = await this.cocktailRepository.find({
      relations: {
        ingredientItem: {
          ingredient: true,
        },
      },
    });

    return cocktails.map(this.mapCocktailToCocktailDto);
  }

  public async createCocktail(cocktail: CocktailDto, userId: number) {
    const user = await this.usersService.findUserById(userId);

    const ingredientItems =
      await this.ingredientsService.generateIngredientItems(
        cocktail.ingredients,
      );

    const newCocktail = this.cocktailRepository.create({
      name: cocktail.name,
      description: cocktail.description,
      preparation: cocktail.preparation,
      author: user,
      comments: [],
      ratings: [],
      ingredientItem: ingredientItems,
    });

    const savedCocktail = await this.cocktailRepository.save(newCocktail);
    return this.mapCocktailToCocktailDto(savedCocktail);
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

    return {
      name: cocktail.name,
      description: cocktail.description,
      preparation: cocktail.preparation,
      ingredients: ingredientsDto,
    };
  }
}
