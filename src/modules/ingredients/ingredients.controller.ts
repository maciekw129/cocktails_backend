import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllIngredients() {
    return this.ingredientsService.getAllIngredients();
  }
}
