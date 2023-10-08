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
import {CocktailsService} from './cocktails.service';
import {GetCurrentUser} from '../../shared/decorators/get-current-user.decorator';
import {Public} from '../../shared/decorators/public.decorator';
import {
  CocktailsParams,
} from './cocktails.model';
import {Cocktail} from './cocktail.entity';
import {PageDto} from '../../shared/pagination/pageDto';
import {CocktailDto} from "./dto/cocktailDto";
import {CreateCocktailDto} from "./dto/createCocktailDto";
import {CocktailListItemDto} from "./dto/cocktailListItemDto";

@Controller('cocktails')
export class CocktailsController {

  constructor(private readonly cocktailsService: CocktailsService) {
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCocktails(
    @Query() params: CocktailsParams,
  ): Promise<PageDto<CocktailListItemDto>> {
    return this.cocktailsService.getAllCocktails(params);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCocktailById(@Param() {id}): Promise<CocktailDto> {
    return this.cocktailsService.getCocktailById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCocktail(
    @Body() createCocktailDto: CreateCocktailDto,
    @GetCurrentUser('sub') userId,
  ): Promise<Cocktail> {
    return this.cocktailsService.createCocktail(createCocktailDto, userId);
  }
}
