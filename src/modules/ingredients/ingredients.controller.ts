import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  getAllIngredients() {
    return this.ingredientsService.getAllIngredients();
  }
}
