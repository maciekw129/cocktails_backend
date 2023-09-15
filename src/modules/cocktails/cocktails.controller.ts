import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { GetCurrentUser } from '../../shared/decorators/get-current-user.decorator';
import { Public } from '../../shared/decorators/public.decorator';
import { CocktailDto, CocktailRequest } from './cocktails.model';
import { Cocktail } from './cocktail.entity';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCocktails(): Promise<CocktailDto[]> {
    return this.cocktailsService.getAllCocktails();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCocktail(
    @Body() createCocktailDto: CocktailRequest,
    @GetCurrentUser('sub') userId,
  ): Promise<Cocktail> {
    return this.cocktailsService.createCocktail(createCocktailDto, userId);
  }
}
