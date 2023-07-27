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
import { CocktailDto } from './cocktails.model';

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
    @Body() createCocktailDto: CocktailDto,
    @GetCurrentUser('sub') userId,
  ): Promise<CocktailDto> {
    return this.cocktailsService.createCocktail(createCocktailDto, userId);
  }
}
