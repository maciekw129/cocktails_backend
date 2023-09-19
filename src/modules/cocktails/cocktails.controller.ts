import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { GetCurrentUser } from '../../shared/decorators/get-current-user.decorator';
import { Public } from '../../shared/decorators/public.decorator';
import {
  CocktailDto,
  CocktailListItemDto,
  CocktailRequest,
  Filters,
} from './cocktails.model';
import { Cocktail } from './cocktail.entity';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCocktails(@Query() params: Filters): Promise<CocktailListItemDto[]> {
    return this.cocktailsService.getAllCocktails(params);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCocktailById(@Param() { id }): Promise<CocktailDto> {
    return this.cocktailsService.getCocktailById(Number(id));
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
