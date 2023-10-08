import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Public } from '../../shared/decorators/public.decorator';
import {Ingredient} from "./entities/ingredient.entity";

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientsService.getAllIngredients();
  }
}
